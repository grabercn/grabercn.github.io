const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); 
const readline = require('readline');

// -------------------------------------------------
// CRITICAL WINDOWS FIXES
// -------------------------------------------------
// 1. Disable Sharp's cache to prevent it from locking files
sharp.cache(false);

// 2. Define a delay helper to let OneDrive/File System catch up
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const photographyDir = path.join(__dirname, ''); 

// -------------------------------------------------
// Helper Functions for Image Processing
// -------------------------------------------------

// Adds a watermark using SHARP (Safe Temp File Method)
async function addWatermarkToImage(imagePath, watermarkText) {
  const tempPath = path.join(path.dirname(imagePath), `temp_wm_${path.basename(imagePath)}`);
  
  try {
    const metadata = await sharp(imagePath).metadata();
    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: rgba(255, 255, 255, 0.7); font-size: 78px; font-family: Arial; font-weight: bold; }
      </style>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="middle"
        class="title" 
        transform="rotate(-30, ${width / 2}, ${height / 2})"
      >
        ${watermarkText}
      </text>
    </svg>
    `;

    // Write to a temporary file first
    await sharp(imagePath)
      .composite([{ input: Buffer.from(svgImage), top: 0, left: 0 }])
      .toFile(tempPath);

    // Small delay to ensure file handle is released
    await delay(200);

    // Swap files safely
    await fs.promises.unlink(imagePath); // Delete original
    await fs.promises.rename(tempPath, imagePath); // Rename temp to original

    console.log(`Watermarked: ${imagePath}`);
    return imagePath;

  } catch (error) {
    console.error(`Error watermarking ${imagePath}:`, error.message);
    // Cleanup temp if it exists
    if (fs.existsSync(tempPath)) await fs.promises.unlink(tempPath).catch(() => {});
  }
}

// Compresses the image using sharp (Safe Temp File Method).
async function compressImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  let outputFormat = 'jpeg'; 
  let quality = 70;

  if (ext === '.png') {
    outputFormat = 'webp';
    quality = 75;
  }

  // Use a temp name for the output
  const tempOutputPath = imagePath.replace(ext, `-temp_compress${ext}`);

  try {
    await sharp(imagePath)
      .resize({
        fit: sharp.fit.inside,
        withoutEnlargement: true,
        width: 1200,
      })
      .toFormat(outputFormat, { quality })
      .toFile(tempOutputPath);

    await delay(200); 

    // Swap files
    await fs.promises.unlink(imagePath);
    await fs.promises.rename(tempOutputPath, imagePath);
    
    console.log(`Compressed: ${imagePath}`);
  } catch (err) {
    console.error(`Error compressing ${imagePath}:`, err.message);
    if (fs.existsSync(tempOutputPath)) await fs.promises.unlink(tempOutputPath).catch(() => {});
  }
}

async function getImageCaption(imagePath) {
  try {
    await fs.promises.access(imagePath);
  } catch (err) {
    console.error(`File not found: ${imagePath}`);
    return "No description available";
  }
  
  try {
    const fileStream = fs.createReadStream(imagePath);
    console.log("Requesting caption for:", path.basename(imagePath));
    
    const response = await fetch("https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning", {
      method: "POST",
      duplex: "half",
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": "Bearer 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"
      },
      body: fileStream
    });

    if (!response.ok) {
        console.log(`API Error: ${response.status} ${response.statusText}`);
        return "No description available";
    }
    
    const result = await response.json();
    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      console.log("Caption:", result[0].generated_text);
      return result[0].generated_text;
    } else {
      console.log("No caption found in response.");
      return "No description available";
    }
  } catch (error) {
    console.error("Caption fetch error:", error.message);
    return "No description available";
  }
}

// -------------------------------------------------
// Modular Functions for Each Task
// -------------------------------------------------

// Option 1: Process All – rename, watermark, compress, add descriptions, REGENERATE JSON.
async function processAllPhotos() {
  try {
    // Read directory
    const files = await fs.promises.readdir(photographyDir);
    // Filter legitimate images (ignore temp files)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('temp_');
    });

    if (imageFiles.length === 0) {
      console.log('No image files found in the directory.');
      return;
    }

    const photoObjects = {};
    let photoIndex = 1;

    // First pass: Index existing "photo#" files so we don't overwrite them
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        const currentPhotoIndex = parseInt(baseName.slice(5), 10);
        
        // Add existing files to our object map immediately
        photoObjects[`photo${currentPhotoIndex}`] = {
          id: currentPhotoIndex,
          name: `${baseName}${ext}`,
          path: `/photography/${baseName}${ext}`,
          title: '', // We will fill these if option 3 was run separately, but usually blank for old ones unless we read JSON
          description: '',
        };
        
        photoIndex = Math.max(photoIndex, currentPhotoIndex + 1);
      }
    }

    // Second pass: Process new files
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      // Skip if it looks like "photo123"
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        continue; 
      }

      const newFileName = `photo${photoIndex}${ext}`;
      const oldFilePath = path.join(photographyDir, file);
      const newFilePath = path.join(photographyDir, newFileName);

      // 1. Rename
      try {
        await fs.promises.rename(oldFilePath, newFilePath);
        console.log(`Renamed ${file} to ${newFileName}`);
        await delay(300); // Wait for FS/OneDrive
      } catch (e) {
        console.error(`Could not rename ${file}:`, e.message);
        continue; // Skip this file if rename fails
      }

      // 2. Watermark
      await addWatermarkToImage(newFilePath, '© Christian Graber');
      
      // 3. Compress
      await compressImage(newFilePath);

      // 4. Caption
      const caption = await getImageCaption(newFilePath);
      const title = caption.split('.')[0].trim();

      // Add to our object map
      photoObjects[`photo${photoIndex}`] = {
        id: photoIndex,
        name: newFileName,
        path: `/photography/${newFileName}`,
        title,
        description: caption,
      };

      photoIndex++;
    }

    // FINAL STEP: Regenerate JSON with ALL objects (old + new)
    await fs.promises.writeFile(
      path.join(__dirname, 'PhotoObject.json'),
      JSON.stringify(photoObjects, null, 2),
      'utf8'
    );
    console.log('PhotoObject.json has been regenerated and saved successfully.');
  } catch (err) {
    console.error('Error in processAllPhotos:', err);
  }
}

// Option 2: Regenerate PhotoObject JSON by scanning the directory.
async function regeneratePhotoObject() {
  try {
    const files = await fs.promises.readdir(photographyDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('temp_');
    });

    const photoObjects = {};
    let photoIndex = 1;
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        const idx = parseInt(baseName.slice(5), 10);
        photoObjects[`photo${idx}`] = {
          id: idx,
          name: file,
          path: `/photography/${file}`,
          title: '',
          description: ''
        };
      }
    }
    await fs.promises.writeFile(
      path.join(__dirname, 'PhotoObject.json'),
      JSON.stringify(photoObjects, null, 2),
      'utf8'
    );
    console.log('PhotoObject.json regenerated successfully.');
  } catch (err) {
    console.error('Error in regeneratePhotoObject:', err);
  }
}

// Option 3: Add or update descriptions for all photos.
async function addDescriptionsToPhotos() {
  try {
    const photoObjectPath = path.join(__dirname, 'PhotoObject.json');
    const data = await fs.promises.readFile(photoObjectPath, 'utf8');
    const photoObjects = JSON.parse(data);
    
    for (let key in photoObjects) {
      const photo = photoObjects[key];
      const filePath = path.join(photographyDir, photo.name);
      
      const caption = await getImageCaption(filePath);
      const title = caption.split('.')[0].trim();
      
      photo.description = caption;
      photo.title = title;
      console.log(`Updated description for ${photo.name}`);
    }
    await fs.promises.writeFile(photoObjectPath, JSON.stringify(photoObjects, null, 2), 'utf8');
    console.log('Descriptions updated in PhotoObject.json.');
  } catch (err) {
    console.error('Error in addDescriptionsToPhotos:', err);
  }
}

// Option 4: Compress all images.
async function compressPhotos() {
  try {
    const files = await fs.promises.readdir(photographyDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('temp_');
    });
    for (let file of imageFiles) {
      const filePath = path.join(photographyDir, file);
      await compressImage(filePath);
    }
    console.log('All images compressed.');
  } catch (err) {
    console.error('Error in compressPhotos:', err);
  }
}

// Option 5: Add watermark to all images.
async function watermarkPhotos() {
  try {
    const files = await fs.promises.readdir(photographyDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('temp_');
    });
    const watermarkText = '© Christian Graber';
    for (let file of imageFiles) {
      const filePath = path.join(photographyDir, file);
      await addWatermarkToImage(filePath, watermarkText);
    }
    console.log('Watermark added to all images.');
  } catch (err) {
    console.error('Error in watermarkPhotos:', err);
  }
}

// Option 6: Rename images that are not in the "photo#" format.
async function renamePhotos() {
  try {
    const files = await fs.promises.readdir(photographyDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('temp_');
    });
    let photoIndex = 1;
    // Determine max index
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        const currentIndex = parseInt(baseName.slice(5), 10);
        photoIndex = Math.max(photoIndex, currentIndex + 1);
      }
    }
    // Rename others
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        continue; 
      }
      const newFileName = `photo${photoIndex}${ext}`;
      const oldFilePath = path.join(photographyDir, file);
      const newFilePath = path.join(photographyDir, newFileName);
      
      try {
        await fs.promises.rename(oldFilePath, newFilePath);
        console.log(`Renamed ${file} to ${newFileName}`);
        await delay(200);
      } catch (e) {
        console.error(`Rename failed for ${file}:`, e.message);
      }
      photoIndex++;
    }
    console.log('Renaming complete.');
  } catch (err) {
    console.error('Error in renamePhotos:', err);
  }
}

// -------------------------------------------------
// CLI Menu
// -------------------------------------------------

function showMenu() {
  console.log('\nChoose an option:');
  console.log('1. Process All (rename, watermark, compress, add descriptions)');
  console.log('2. Regenerate PhotoObject JSON');
  console.log('3. Add/Update Descriptions');
  console.log('4. Compress Images');
  console.log('5. Add Watermark to Images');
  console.log('6. Rename Images');
}

/**
 * Ask a question with a timeout.
 * @param {string} query The question to ask.
 * @param {number} timeoutMs Time in milliseconds before defaulting.
 * @param {string} defaultValue The value to return if timeout is reached.
 */
function askQuestion(query, timeoutMs = 10000, defaultValue = "1") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    // Set a timer to close and resolve default if no input
    const timer = setTimeout(() => {
      rl.close();
      console.log(`\n\n[Timeout] No input received in ${timeoutMs/1000}s.`);
      console.log(`Defaulting to Option ${defaultValue} (Process All)...\n`);
      resolve(defaultValue);
    }, timeoutMs);

    rl.question(`${query} [Auto-selecting "1" in ${timeoutMs/1000}s]: `, answer => {
      clearTimeout(timer); // Stop the timer if they type something
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function main() {
  showMenu();
  const answer = await askQuestion("Enter your choice (1-6)", 10000, "1");
  
  switch (answer.trim()) {
    case "1":
      await processAllPhotos();
      break;
    case "2":
      await regeneratePhotoObject();
      break;
    case "3":
      await addDescriptionsToPhotos();
      break;
    case "4":
      await compressPhotos();
      break;
    case "5":
      await watermarkPhotos();
      break;
    case "6":
      await renamePhotos();
      break;
    default:
      console.log("Invalid option selected.");
  }
}

main();