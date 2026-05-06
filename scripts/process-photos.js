#!/usr/bin/env node

/**
 * Unified Photo Processing Pipeline
 *
 * Processes all photos in public/photography/ in one command:
 *   1. Strip EXIF/GPS metadata + inject anti-AI XMP directives
 *   2. Generate WebP versions (full-size + thumbnails)
 *   3. Update PhotoObject.json with WebP/thumb paths
 *   4. Tag photos with location data based on title/description keywords
 *
 * Usage:
 *   node scripts/process-photos.js          # Run full pipeline
 *   node scripts/process-photos.js --step 1 # Run only step 1 (metadata)
 *   node scripts/process-photos.js --step 2 # Run only step 2 (WebP)
 *   node scripts/process-photos.js --step 3 # Run only step 3 (JSON paths)
 *   node scripts/process-photos.js --step 4 # Run only step 4 (location tags)
 *   node scripts/process-photos.js --skip-existing # Skip WebP files that already exist
 *
 * Requires: sharp (already in project dependencies)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const PHOTO_DIR = path.join(__dirname, '..', 'public', 'photography');
const JSON_PATH = path.join(PHOTO_DIR, 'PhotoObject.json');
const OWNER = 'Christian Graber';
const WEBSITE = 'https://grabercn.github.io';
const BATCH_SIZE = 10;

const WEBP_QUALITY_FULL = 80;
const WEBP_QUALITY_THUMB = 70;
const JPEG_QUALITY_FULL = 95;
const JPEG_QUALITY_THUMB = 75;
const THUMB_WIDTH = 400;

// ─── Parse CLI args ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const stepOnly = args.includes('--step') ? parseInt(args[args.indexOf('--step') + 1]) : null;
const skipExisting = args.includes('--skip-existing');

function shouldRun(step) {
  return stepOnly === null || stepOnly === step;
}

// ─── Utility: get sorted JPEG files ──────────────────────────────────────────

function getPhotoFiles() {
  return fs.readdirSync(PHOTO_DIR)
    .filter(f => /^photo\d+\.jpg$/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const nb = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return na - nb;
    });
}

// ─── Utility: run in batches ─────────────────────────────────────────────────

async function processBatched(items, fn, progressLabel) {
  let done = 0;
  let errors = 0;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (item) => {
        try {
          await fn(item);
          done++;
          return { ok: true };
        } catch (err) {
          console.error(`  ERROR: ${item} - ${err.message}`);
          errors++;
          return { ok: false };
        }
      })
    );

    if ((i + BATCH_SIZE) % 50 < BATCH_SIZE || i + BATCH_SIZE >= items.length) {
      const pct = ((Math.min(i + BATCH_SIZE, items.length) / items.length) * 100).toFixed(0);
      process.stdout.write(`\r  ${progressLabel}: ${Math.min(i + BATCH_SIZE, items.length)}/${items.length} (${pct}%)`);
    }
  }

  console.log('');
  return { done, errors };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1: Strip metadata + inject anti-AI XMP
// ═══════════════════════════════════════════════════════════════════════════════

function buildXmpPayload() {
  const year = new Date().getFullYear();
  const xmp = `<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
      xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"
      xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
      xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">
      <dc:rights>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">Copyright ${year} ${OWNER}. All rights reserved.</rdf:li>
        </rdf:Alt>
      </dc:rights>
      <dc:creator>
        <rdf:Seq>
          <rdf:li>${OWNER}</rdf:li>
        </rdf:Seq>
      </dc:creator>
      <xmpRights:Marked>True</xmpRights:Marked>
      <xmpRights:WebStatement>${WEBSITE}</xmpRights:WebStatement>
      <xmpRights:UsageTerms>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">This image may not be used for AI training, machine learning, generative AI, data mining, or any form of automated content generation without explicit written permission from ${OWNER}.</rdf:li>
        </rdf:Alt>
      </xmpRights:UsageTerms>
      <plus:DataMining>http://ns.useplus.org/ldf/vocab/DMI-PROHIBITED-AITRAINING</plus:DataMining>
      <plus:Version>2.0</plus:Version>
      <Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture</Iptc4xmpExt:DigitalSourceType>
      <photoshop:Credit>${OWNER}</photoshop:Credit>
      <photoshop:Source>${WEBSITE}</photoshop:Source>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
  return Buffer.from(xmp, 'utf-8');
}

function injectXmpIntoJpeg(jpegBuffer, xmpPayload) {
  if (jpegBuffer[0] !== 0xFF || jpegBuffer[1] !== 0xD8) {
    throw new Error('Not a valid JPEG file');
  }
  const xmpNamespace = Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'ascii');
  const segmentData = Buffer.concat([xmpNamespace, xmpPayload]);
  const segmentLength = segmentData.length + 2;
  if (segmentLength > 65535) throw new Error('XMP payload too large');

  const app1Marker = Buffer.alloc(4);
  app1Marker[0] = 0xFF;
  app1Marker[1] = 0xE1;
  app1Marker[2] = (segmentLength >> 8) & 0xFF;
  app1Marker[3] = segmentLength & 0xFF;

  return Buffer.concat([
    jpegBuffer.slice(0, 2),
    app1Marker,
    segmentData,
    jpegBuffer.slice(2)
  ]);
}

// ─── GPS to country reverse lookup (offline, approximate) ────────────────────
// Rough bounding boxes for countries the photographer has visited.
// Used to infer country from GPS coords BEFORE stripping EXIF.
const COUNTRY_BOUNDS = [
  { country: 'Japan',        latMin: 24, latMax: 46, lonMin: 122, lonMax: 154 },
  { country: 'Ireland',      latMin: 51, latMax: 56, lonMin: -11, lonMax: -5 },
  { country: 'UK',           latMin: 49, latMax: 61, lonMin: -8,  lonMax: 2 },
  { country: 'Czech Republic', latMin: 48.5, latMax: 51.1, lonMin: 12, lonMax: 19 },
  { country: 'Switzerland',  latMin: 45.8, latMax: 48, lonMin: 5.9, lonMax: 10.5 },
  { country: 'Italy',        latMin: 36, latMax: 47.1, lonMin: 6.6, lonMax: 18.5 },
  { country: 'Spain',        latMin: 36, latMax: 43.8, lonMin: -9.3, lonMax: 4.3 },
  { country: 'Germany',      latMin: 47.3, latMax: 55.1, lonMin: 5.9, lonMax: 15 },
  { country: 'France',       latMin: 41.3, latMax: 51.1, lonMin: -5.1, lonMax: 9.6 },
];

function gpsToCountry(lat, lon) {
  for (const b of COUNTRY_BOUNDS) {
    if (lat >= b.latMin && lat <= b.latMax && lon >= b.lonMin && lon <= b.lonMax) {
      return b.country;
    }
  }
  return null;
}

function parseExifGps(metadata) {
  // sharp returns EXIF as a raw buffer. Try to extract GPS via exif-reader if available.
  if (!metadata.exif) return null;
  try {
    let exifReader;
    try { exifReader = require('exif-reader'); } catch { return null; }
    const exif = exifReader(metadata.exif);
    const gps = exif.GPS || exif.gps;
    if (!gps) return null;

    const lat = gps.GPSLatitude;
    const lon = gps.GPSLongitude;
    if (!lat || !lon) return null;

    // Convert DMS array [degrees, minutes, seconds] to decimal if needed
    let latDec, lonDec;
    if (Array.isArray(lat)) {
      latDec = lat[0] + lat[1] / 60 + lat[2] / 3600;
      lonDec = lon[0] + lon[1] / 60 + lon[2] / 3600;
    } else {
      latDec = lat;
      lonDec = lon;
    }

    // Apply hemisphere
    const latRef = gps.GPSLatitudeRef || 'N';
    const lonRef = gps.GPSLongitudeRef || 'E';
    if (latRef === 'S') latDec = -latDec;
    if (lonRef === 'W') lonDec = -lonDec;

    return { lat: latDec, lon: lonDec };
  } catch {
    return null;
  }
}

async function step1_metadata() {
  console.log('');
  console.log('STEP 1: Extract GPS country → Strip EXIF → Inject anti-AI XMP');
  console.log('─'.repeat(55));

  const xmpPayload = buildXmpPayload();
  const files = getPhotoFiles();
  console.log(`  Found ${files.length} photos. XMP payload: ${xmpPayload.length} bytes`);

  // Load PhotoObject.json to save inferred country data
  let photoData = {};
  try { photoData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8')); } catch {}

  let gpsFound = 0;
  let gpsCountryInferred = 0;
  let noGps = [];

  const { done, errors } = await processBatched(
    files,
    async (file) => {
      const filePath = path.join(PHOTO_DIR, file);
      const tempPath = filePath + '.tmp';

      // BEFORE stripping: read GPS coords from EXIF
      const metadata = await sharp(filePath).metadata();
      const gps = parseExifGps(metadata);
      const photoKey = file.replace('.jpg', '').replace('.jpeg', '');

      if (gps) {
        gpsFound++;
        const country = gpsToCountry(gps.lat, gps.lon);
        if (country && photoData[photoKey]) {
          // Only set gpsCountry if we found it - don't overwrite existing location tag
          photoData[photoKey].gpsCountry = country;
          gpsCountryInferred++;
        }
      } else {
        noGps.push(file);
      }

      // Re-encode to strip ALL existing metadata (including GPS)
      await sharp(filePath)
        .jpeg({ quality: JPEG_QUALITY_FULL, mozjpeg: true })
        .toFile(tempPath);

      // Inject anti-AI XMP
      const cleanJpeg = fs.readFileSync(tempPath);
      const taggedJpeg = injectXmpIntoJpeg(cleanJpeg, xmpPayload);
      fs.writeFileSync(tempPath, taggedJpeg);

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
    },
    'Metadata'
  );

  // Save updated JSON with gpsCountry data
  fs.writeFileSync(JSON_PATH, JSON.stringify(photoData, null, 2) + '\n', 'utf8');

  console.log(`  Done: ${done} processed, ${errors} errors`);
  console.log(`  GPS found: ${gpsFound}, country inferred: ${gpsCountryInferred}`);
  console.log('  [x] GPS read → country saved  [x] EXIF stripped  [x] Anti-AI XMP injected');

  if (noGps.length > 0) {
    console.log('');
    console.log(`  ⚠ WARNING: ${noGps.length} photos had no GPS data.`);
    console.log('    These photos need a "location" tag added manually in PhotoObject.json');
    console.log('    or will be tagged via keyword matching in step 4.');
    if (noGps.length <= 20) {
      console.log('    Files: ' + noGps.join(', '));
    } else {
      console.log('    First 20: ' + noGps.slice(0, 20).join(', ') + '...');
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2: Generate WebP + thumbnails
// ═══════════════════════════════════════════════════════════════════════════════

async function step2_webp() {
  console.log('');
  console.log('STEP 2: Generate WebP versions + thumbnails');
  console.log('─'.repeat(55));

  const files = getPhotoFiles();
  let totalSaved = 0;
  let skipped = 0;

  const { done, errors } = await processBatched(
    files,
    async (file) => {
      const filePath = path.join(PHOTO_DIR, file);
      const base = filePath.replace(path.extname(filePath), '');
      const originalSize = fs.statSync(filePath).size;

      const allExist = fs.existsSync(base + '.webp') &&
                       fs.existsSync(base + '_thumb.jpg') &&
                       fs.existsSync(base + '_thumb.webp');

      if (skipExisting && allExist) {
        skipped++;
        return;
      }

      // Full-size WebP
      if (!skipExisting || !fs.existsSync(base + '.webp')) {
        await sharp(filePath).webp({ quality: WEBP_QUALITY_FULL }).toFile(base + '.webp');
        totalSaved += originalSize - fs.statSync(base + '.webp').size;
      }

      // Thumbnail JPEG
      if (!skipExisting || !fs.existsSync(base + '_thumb.jpg')) {
        await sharp(filePath).resize(THUMB_WIDTH).jpeg({ quality: JPEG_QUALITY_THUMB }).toFile(base + '_thumb.jpg');
      }

      // Thumbnail WebP
      if (!skipExisting || !fs.existsSync(base + '_thumb.webp')) {
        await sharp(filePath).resize(THUMB_WIDTH).webp({ quality: WEBP_QUALITY_THUMB }).toFile(base + '_thumb.webp');
      }
    },
    'WebP'
  );

  console.log(`  Done: ${done} processed, ${skipped} skipped, ${errors} errors`);
  console.log(`  Total WebP savings: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3: Update PhotoObject.json with WebP/thumb paths
// ═══════════════════════════════════════════════════════════════════════════════

function step3_updateJson() {
  console.log('');
  console.log('STEP 3: Update PhotoObject.json with image paths');
  console.log('─'.repeat(55));

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  let updated = 0;

  for (const key of Object.keys(data)) {
    const entry = data[key];
    const baseName = entry.name.replace(/\.jpg$/i, '');

    entry.webpPath = `/photography/${baseName}.webp`;
    entry.thumbPath = `/photography/${baseName}_thumb.webp`;
    entry.thumbJpgPath = `/photography/${baseName}_thumb.jpg`;
    updated++;
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`  Updated ${updated} entries with webpPath, thumbPath, thumbJpgPath`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4: Tag photos with location data
// ═══════════════════════════════════════════════════════════════════════════════

const LOCATION_RULES = [
  {
    location: 'Prague',
    keywords: [
      'prague', 'vltava', 'vysehrad', 'st. vitus', 'charles bridge', 'wenceslas',
      'mala strana', 'certovka', 'petrin', 'franz kafka', 'czech', 'trdelnik',
      'old town prague', 'national museum',
    ],
  },
  {
    location: 'London',
    keywords: [
      'london', 'big ben', 'westminster', 'british museum', 'rosetta stone',
      'leicester square', 'regent street', 'royal albert hall', 'kensington',
      'albert memorial', 'henry vii', 'abbey choir', 'abbey nave', 'abbey cloisters',
      'abbey altar', 'abbey high altar', 'fan vault', 'banners and light',
      'methodist central hall', 'elizabeth tower', 'golden galleon',
      'buckingham palace', 'leadenhall market', 'tower bridge', 'walkie talkie',
      'fenchurch street', 'tower clock', 'white tower', 'tower of london',
      'thames', 'the shard', 'st. paul', 'paternoster square',
      'city skyline', 'skyline over the balustrade',
    ],
  },
  {
    location: 'Switzerland',
    keywords: [
      'swiss', 'switzerland', 'zurich', 'basel', 'bern', 'geneva', 'winterthur',
      'zermatt', 'matterhorn', 'appenzell', 'lausanne', 'lugano', 'bellinzona',
      'gruyeres', 'kandersteg', 'oeschinensee', 'stein am rhein', 'rhine',
      'santis', 'gornergrat', 'sunnegga', 'lake geneva', 'jet d\'eau',
      'eglisau', 'arbon', 'zytglogge', 'barengraben', 'rosengarten',
      'einstein', 'bernese oberland', 'alpine', 'alps', 'sbb', 'gruyere',
      'giger museum', 'olympic museum', 'musee olympique', 'ouchy',
      'sentiero di gandria', 'castelgrande', 'montebello', 'limmat',
      'zhaw', 'eole sculpture', 'lac leman', 'broken chair',
      'federal palace', 'bern minster', 'cathedral light',
      'half-timbered', 'clock tower gateway', 'rooftops and flags',
      'church on the hill', 'lakefront', 'pedal boats',
      'natale in citta', 'christmas lights, switzerland',
      'cable car', 'mountain through trees', 'sunlit snow path',
      'rocky alpine terrain', 'forest and cliff face',
      'misty alpine village', 'hillside chapel', 'valley in the mist',
      'fog and light', 'christmas market from above',
      'peak through the pines', 'forest trail opening',
      'cable car descent', 'sea of peaks',
      'baroque church interior', 'painted church interior',
    ],
  },
  {
    location: 'Italy',
    keywords: [
      'milan', 'duomo', 'galleria vittorio', 'castello sforzesco', 'sforza',
      'san lorenzo', 'sant\'ambrogio', 'santa maria delle grazie', 'last supper',
      'verona', 'castelvecchio', 'arena di verona', 'juliet', 'adige',
      'ponte di castelvecchio', 'basilica di san lorenzo',
    ],
  },
  {
    location: 'Barcelona',
    keywords: [
      'barcelona', 'sagrada familia', 'montjuic', 'mnac', 'placa de catalunya',
      'gaudi', 'poble espanyol', 'arenas de barcelona', 'catalan',
      'olympic park, barcelona', 'estadi olimpic', 'calatrava tower',
      'olympic columns',
    ],
  },
  {
    location: 'Ireland',
    keywords: [
      'dublin', 'ireland', 'irish', 'trinity college', 'guinness', 'temple bar',
      'liffey', 'kilkenny', 'glendalough', 'howth', 'wicklow',
      'christ church', 'st patrick', 'grafton street', 'samuel beckett',
      'custom house', 'oscar wilde', 'st. stephen\'s', 'merrion square',
      'fleet street', 'palace bar', 'chapel royal', 'dublin castle',
      'ha\'penny bridge', 'baily lighthouse', 'gorse',
      'st. canice', 'border collie', 'sheep',
    ],
  },
  {
    location: 'Japan',
    keywords: [
      'japan', 'japanese', 'tokyo', 'osaka', 'kyoto', 'nara', 'hokkaido',
      'kamakura', 'enoshima', 'sapporo', 'fushimi inari', 'torii',
      'kiyomizu', 'kinkaku-ji', 'golden pavilion', 'arashiyama', 'bamboo grove',
      'shinto', 'shrine', 'temple', 'pagoda', 'zen rock garden',
      'ninna-ji', 'tenryu-ji', 'ryoan-ji', 'yasaka',
      'shibuya', 'shinjuku', 'ueno', 'ameyoko', 'akihabara',
      'yodobashi', 'imperial palace', 'nijubashi',
      'tsurugaoka', 'hase-dera', 'jizo', 'shonan monorail',
      'yokohama', 'chureito', 'fuji', 'fujiyoshida',
      'myaku-myaku', 'expo 2025', 'mikuni', 'lake shikotsu',
      'farm tomita', 'furano', 'nakafurano', 'lavender',
      'horoka', 'swallowtail caterpillar',
      'bentendo', 'shinobazu', 'wind chime',
      'karaoke kan', 'rice paddy', 'ryokan',
      'izakaya', 'vending machine', 'sea candle',
      'napa valley in osaka', 'candy apple',
      'shika senbei', 'deer', 'fawn',
      'inari', 'carp', 'koi', 'dodecahedra', 'geometric lantern',
      'lotus lantern', 'liminal hallway', 'zigzag stairs',
      'harbor night zoom', 'river reflections',
      'apartment corridor', 'fluorescent bokeh',
      'parking lot portrait',
    ],
  },
];

const MANUAL_OVERRIDES = {
  235: 'Switzerland', 241: 'Switzerland', 304: 'Prague', 318: 'Prague',
  309: 'Prague', 310: 'Prague', 311: 'Prague', 312: 'Prague',
  313: 'Prague', 314: 'Prague', 317: 'Prague', 390: 'Ireland',
  528: 'Japan', 543: 'Japan', 548: 'Japan', 549: 'Japan',
  556: 'Japan', 558: 'Japan', 560: 'Japan', 454: 'Japan',
  456: 'Japan', 465: 'Japan', 467: 'Japan', 469: 'Japan',
  481: 'Japan', 137: 'Switzerland', 58: 'Switzerland',
};

const HAMBURG_KEYWORDS = ['elbphilharmonie', 'hamburg'];

function step4_tagLocations() {
  console.log('');
  console.log('STEP 4: Tag photos with location data');
  console.log('─'.repeat(55));

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  let tagged = 0;
  let other = 0;

  for (const key of Object.keys(data)) {
    const photo = data[key];
    const text = ((photo.title || '') + ' ' + (photo.description || '')).toLowerCase();

    // Manual overrides first
    if (MANUAL_OVERRIDES[photo.id]) {
      photo.location = MANUAL_OVERRIDES[photo.id];
      tagged++;
      continue;
    }

    // Hamburg → Other
    if (HAMBURG_KEYWORDS.some(kw => text.includes(kw))) {
      photo.location = 'Other';
      other++;
      continue;
    }

    // Keyword matching
    let matched = false;
    for (const rule of LOCATION_RULES) {
      if (rule.keywords.some(kw => text.includes(kw.toLowerCase()))) {
        photo.location = rule.location;
        matched = true;
        tagged++;
        break;
      }
    }

    if (!matched) {
      // Fallback: use gpsCountry from step 1 if available
      if (photo.gpsCountry) {
        // Map GPS country names to our location categories
        const gpsMap = {
          'Czech Republic': 'Prague',
          'UK': 'London',
          'Germany': 'Other',
          'France': 'Other',
        };
        photo.location = gpsMap[photo.gpsCountry] || photo.gpsCountry;
        tagged++;
      } else {
        photo.location = 'Other';
        other++;
      }
    }
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');

  // Print summary
  const summary = {};
  const noLocation = [];
  for (const key of Object.keys(data)) {
    const loc = data[key].location;
    summary[loc] = (summary[loc] || 0) + 1;
    if (loc === 'Other' && !data[key].gpsCountry) {
      noLocation.push(key);
    }
  }

  console.log(`  Tagged: ${tagged}, Other: ${other}`);
  console.log('');
  console.log('  Location breakdown:');
  for (const [loc, count] of Object.entries(summary).sort((a, b) => b[1] - a[1])) {
    const bar = '█'.repeat(Math.ceil(count / 10));
    console.log(`    ${loc.padEnd(14)} ${String(count).padStart(4)}  ${bar}`);
  }

  if (noLocation.length > 0) {
    console.log('');
    console.log(`  ⚠ ${noLocation.length} photos tagged "Other" with no GPS fallback.`);
    console.log('    Add "location" manually in PhotoObject.json for these:');
    if (noLocation.length <= 15) {
      console.log('    ' + noLocation.join(', '));
    } else {
      console.log('    ' + noLocation.slice(0, 15).join(', ') + '...');
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main pipeline
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║          Photo Processing Pipeline v2.0              ║');
  console.log('║          © Christian Graber                          ║');
  console.log('╚═══════════════════════════════════════════════════════╝');

  const startTime = Date.now();

  if (stepOnly) {
    console.log(`\nRunning step ${stepOnly} only...`);
  }
  if (skipExisting) {
    console.log('Skipping existing WebP files (--skip-existing)');
  }

  if (shouldRun(1)) await step1_metadata();
  if (shouldRun(2)) await step2_webp();
  if (shouldRun(3)) step3_updateJson();
  if (shouldRun(4)) step4_tagLocations();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('');
  console.log('═'.repeat(55));
  console.log(`Pipeline complete in ${elapsed}s`);
  console.log('');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
