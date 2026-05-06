#!/usr/bin/env node

/**
 * Photo Processing Script
 *
 * Processes all photos in public/photography/:
 * 1. Strips ALL existing EXIF/GPS/location metadata (via sharp re-encode)
 * 2. Injects XMP anti-AI training metadata directly into JPEG bytes
 * 3. Embeds copyright + PLUS DataMining prohibition
 *
 * Usage: node scripts/process-photos.js
 *
 * Requires: sharp (already in project dependencies)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTO_DIR = path.join(__dirname, '..', 'public', 'photography');
const OWNER = 'Christian Graber';
const WEBSITE = 'https://grabercn.github.io';

// Build XMP packet with anti-AI training directives
function buildXmpPayload() {
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
          <rdf:li xml:lang="x-default">Copyright ${new Date().getFullYear()} ${OWNER}. All rights reserved.</rdf:li>
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

/**
 * Inject XMP into JPEG by writing an APP1 marker segment.
 * JPEG XMP is stored in APP1 (0xFFE1) with the namespace
 * "http://ns.adobe.com/xap/1.0/\0" prefix.
 */
function injectXmpIntoJpeg(jpegBuffer, xmpPayload) {
  // JPEG must start with SOI (0xFFD8)
  if (jpegBuffer[0] !== 0xFF || jpegBuffer[1] !== 0xD8) {
    throw new Error('Not a valid JPEG file');
  }

  // XMP APP1 namespace prefix (null-terminated)
  const xmpNamespace = Buffer.from('http://ns.adobe.com/xap/1.0/\0', 'ascii');

  // Build the APP1 segment:
  // [0xFF, 0xE1] + [2-byte length] + [namespace] + [xmp payload]
  const segmentData = Buffer.concat([xmpNamespace, xmpPayload]);
  const segmentLength = segmentData.length + 2; // +2 for the length field itself

  if (segmentLength > 65535) {
    throw new Error('XMP payload too large for single APP1 segment');
  }

  const app1Marker = Buffer.alloc(4);
  app1Marker[0] = 0xFF;
  app1Marker[1] = 0xE1; // APP1
  app1Marker[2] = (segmentLength >> 8) & 0xFF;
  app1Marker[3] = segmentLength & 0xFF;

  // Insert right after the SOI marker (first 2 bytes)
  return Buffer.concat([
    jpegBuffer.slice(0, 2),   // SOI
    app1Marker,                // APP1 marker + length
    segmentData,               // namespace + XMP
    jpegBuffer.slice(2)        // rest of the file
  ]);
}

async function processPhoto(filePath, xmpPayload) {
  const tempPath = filePath + '.tmp';

  // Step 1: Use sharp to re-encode, which strips ALL existing metadata
  await sharp(filePath)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(tempPath);

  // Step 2: Read the clean JPEG and inject our XMP anti-AI metadata
  const cleanJpeg = fs.readFileSync(tempPath);
  const taggedJpeg = injectXmpIntoJpeg(cleanJpeg, xmpPayload);
  fs.writeFileSync(tempPath, taggedJpeg);

  // Step 3: Replace original
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
}

async function main() {
  console.log('Photo Processing Script');
  console.log('=======================');
  console.log('');

  const xmpPayload = buildXmpPayload();
  console.log(`XMP payload size: ${xmpPayload.length} bytes`);

  // Find all image files
  const files = fs.readdirSync(PHOTO_DIR)
    .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .sort((a, b) => {
      const na = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const nb = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return na - nb;
    });

  console.log(`Found ${files.length} photos to process.`);
  console.log('');
  console.log('Processing: strip metadata -> re-encode -> inject anti-AI XMP...');
  console.log('');

  let processed = 0;
  let errors = 0;

  const BATCH_SIZE = 10;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (file) => {
      const filePath = path.join(PHOTO_DIR, file);
      try {
        await processPhoto(filePath, xmpPayload);
        processed++;
      } catch (err) {
        console.error(`  ERROR: ${file} - ${err.message}`);
        errors++;
      }
    });

    await Promise.all(promises);

    if ((i + BATCH_SIZE) % 50 < BATCH_SIZE) {
      console.log(`  Progress: ${Math.min(i + BATCH_SIZE, files.length)}/${files.length} photos...`);
    }
  }

  console.log('');
  console.log('=======================');
  console.log(`Done! Processed: ${processed}, Errors: ${errors}`);
  console.log('');
  console.log('What was applied to each photo:');
  console.log('  [x] All existing EXIF/GPS/location metadata: STRIPPED');
  console.log('  [x] XMP Rights: "Do not use for AI training" directive');
  console.log('  [x] XMP PLUS DataMining: DMI-PROHIBITED-AITRAINING');
  console.log('  [x] XMP Copyright: ' + OWNER);
  console.log('  [x] XMP Digital Source: digitalCapture (proves human-taken)');
  console.log('');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
