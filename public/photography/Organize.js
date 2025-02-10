const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas'); // for watermarking
const sharp = require('sharp'); // for image compression
// For Node 18+ the global fetch is available; if not, install node-fetch.
const readline = require('readline');

const photographyDir = path.join(__dirname, ''); // Adjust as needed

// -------------------------------------------------
// Helper Functions for Image Processing
// -------------------------------------------------

// Adds a watermark to the image using canvas.
async function addWatermarkToImage(imagePath, watermarkText) {
  const img = await loadImage(imagePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  // Draw the original image
  ctx.drawImage(img, 0, 0);

  // Configure watermark text
  ctx.font = '78px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // white with transparency
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.rotate(-30 * Math.PI / 180); // rotate watermark

  // Draw watermark (centered)
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.fillText(watermarkText, x, y);

  const buffer = canvas.toBuffer('image/png');
  await fs.promises.writeFile(imagePath, buffer);
  console.log(`Watermarked: ${imagePath}`);
  return imagePath;
}

// Compresses the image using sharp.
async function compressImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  let outputFormat = 'jpeg'; // default for JPEG
  let quality = 70;

  // If PNG, convert to WebP for better performance.
  if (ext === '.png') {
    outputFormat = 'webp';
    quality = 75;
  }

  const compressedImagePath = imagePath.replace(ext, `-compressed${ext}`);

  await sharp(imagePath)
    .resize({
      fit: sharp.fit.inside,
      withoutEnlargement: true,
      width: 1200,
    })
    .toFormat(outputFormat, { quality })
    .toFile(compressedImagePath);

  // Replace the original file with the compressed version.
  await fs.promises.rename(compressedImagePath, imagePath);
  console.log(`Compressed: ${imagePath}`);
}

async function getImageCaption(imagePath) {
  try {
    await fs.promises.access(imagePath);
  } catch (err) {
    console.error(`File not found: ${imagePath}`);
    return "No description available";
  }
  
  try {
    // Read the image file as a stream
    const fileStream = fs.createReadStream(imagePath);
    
    // Log a minimal message.
    console.log("Requesting caption for:", imagePath);
    
    // Use the Hugging Face Inference API endpoint with your token.
    // (Replace <YOUR_HF_TOKEN> with your free token from Hugging Face.)
    const response = await fetch("https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning", {
      method: "POST",
      duplex: "half",
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": "Bearer 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"
      },
      body: fileStream
    });
    
    console.log("Response status:", response.status);
    
    const result = await response.json();
    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      console.log("Caption:", result[0].generated_text);
      return result[0].generated_text;
    } else {
      const msg = result.error || "No description available";
      console.log("Error message:", msg);
      return "No description available";
    }
  } catch (error) {
    console.error("Error fetching caption:", error);
    return "No description available";
  }
}

// -------------------------------------------------
// Modular Functions for Each Task
// -------------------------------------------------

// Option 1: Process All – rename, watermark, compress, and add descriptions.
async function processAllPhotos() {
  try {
    const files = await fs.promises.readdir(photographyDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log('No image files found in the directory.');
      return;
    }

    const photoObjects = {};
    let photoIndex = 1;

    // First pass: add already correctly renamed files.
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        const currentPhotoIndex = parseInt(baseName.slice(5), 10);
        photoObjects[`photo${currentPhotoIndex}`] = {
          id: currentPhotoIndex,
          name: `${baseName}${ext}`,
          path: `/photography/${baseName}${ext}`,
          title: '',
          description: '',
        };
        photoIndex = Math.max(photoIndex, currentPhotoIndex + 1);
        console.log(`Skipping already renamed file: ${file}`);
      }
    }

    // Second pass: process files that are not yet renamed.
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        continue; // already processed
      }
      const newFileName = `photo${photoIndex}${ext}`;
      const oldFilePath = path.join(photographyDir, file);
      const newFilePath = path.join(photographyDir, newFileName);

      // Rename file.
      await fs.promises.rename(oldFilePath, newFilePath);
      console.log(`Renamed ${file} to ${newFileName}`);

      // Add watermark.
      const watermarkText = '© Christian Graber';
      await addWatermarkToImage(newFilePath, watermarkText);

      // Compress image.
      await compressImage(newFilePath);

      // Get description (caption) and derive a title (first sentence).
      const caption = await getImageCaption(newFilePath);
      const title = caption.split('.')[0].trim();

      photoObjects[`photo${photoIndex}`] = {
        id: photoIndex,
        name: newFileName,
        path: `/photography/${newFileName}`,
        title,
        description: caption,
      };

      photoIndex++;
    }

    // Save the photo objects to PhotoObject.json.
    await fs.promises.writeFile(
      path.join(__dirname, 'PhotoObject.json'),
      JSON.stringify(photoObjects, null, 2),
      'utf8'
    );
    console.log('PhotoObject.json has been saved successfully.');
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
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

    const photoObjects = {};
    let photoIndex = 1;
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      // Assume only properly processed files start with "photo"
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        photoObjects[`photo${photoIndex}`] = {
          id: photoIndex,
          name: file,
          path: `/photography/${file}`,
          title: '',
          description: ''
        };
        photoIndex++;
      } else {
        console.log(`Skipping unprocessed file: ${file}`);
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
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
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
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
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
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });
    let photoIndex = 1;
    // Determine current photo index from already renamed files.
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        const currentIndex = parseInt(baseName.slice(5), 10);
        photoIndex = Math.max(photoIndex, currentIndex + 1);
      }
    }
    // Rename unprocessed files.
    for (let file of imageFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        continue; // already renamed
      }
      const newFileName = `photo${photoIndex}${ext}`;
      const oldFilePath = path.join(photographyDir, file);
      const newFilePath = path.join(photographyDir, newFileName);
      await fs.promises.rename(oldFilePath, newFilePath);
      console.log(`Renamed ${file} to ${newFileName}`);
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

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer);
  }));
}

async function main() {
  showMenu();
  const answer = await askQuestion("Enter your choice (1-6): ");
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
