const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas'); // Using 'canvas' library to add watermark

// Directory of your photos
const photographyDir = path.join(__dirname, '', ''); // Ensure this is set correctly

// Function to add watermark to the image using canvas
async function addWatermarkToImage(imagePath, watermarkText) {
  const img = await loadImage(imagePath);

  // Create a canvas to overlay the watermark
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  // Draw the image to the canvas
  ctx.drawImage(img, 0, 0);

  // Set the watermark text properties
  ctx.font = '78px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // White with transparency
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.rotate(-30 * Math.PI / 180); // Rotate watermark

  // Add the watermark to the image (centered)
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.fillText(watermarkText, x, y);

  // Convert the canvas to a buffer (image data)
  const buffer = canvas.toBuffer('image/png');

  // Overwrite the original image with the watermarked image
  await fs.promises.writeFile(imagePath, buffer);
  
  return imagePath; // Return the original image path after overwrite
}

// Function to rename and organize photos asynchronously
async function organizePhotos() {
  try {
    // Read the directory contents
    const files = await fs.promises.readdir(photographyDir);

    // Filter only image files (you can add more extensions if necessary)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });

    if (imageFiles.length === 0) {
      console.log('No image files found in the directory.');
      return;
    }

    // Object to hold the photo objects
    const photoObjects = {};

    // Keep track of the last photo index used
    let photoIndex = 1;

    // First pass: Count the number of already renamed photos and track their names
    for (let index = 0; index < imageFiles.length; index++) {
      const file = imageFiles[index];
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext); // Get the name without the extension

      // Check if the file is already named correctly (e.g., photo1.jpg, photo2.jpg, etc.)
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        // Extract the photo number (e.g., photo1 => 1, photo10 => 10)
        const currentPhotoIndex = parseInt(baseName.slice(5), 10);

        // If it's already named correctly, add it to the photoObjects and skip renaming
        photoObjects[`photo${currentPhotoIndex}`] = {
          id: currentPhotoIndex,
          name: `${baseName}${ext}`,
          path: `/photography/${baseName}${ext}`, // Path relative to your public folder
        };

        // Update photoIndex to continue from the next available index
        photoIndex = Math.max(photoIndex, currentPhotoIndex + 1);
        console.log(`Skipping ${file}, it is already named ${file}`);
      }
    }

    // Second pass: Rename files that are not correctly named and add watermark
    for (let index = 0; index < imageFiles.length; index++) {
      const file = imageFiles[index];
      const ext = path.extname(file); // Get file extension (e.g., .jpg, .png)
      const baseName = path.basename(file, ext); // Get the base name without extension

      // If the file is already named correctly, skip it
      if (baseName.startsWith('photo') && !isNaN(baseName.slice(5))) {
        console.log(`Skipping ${file}, it is already named ${file}`);
        continue;
      }

      // Create the new file name with the next available index
      const newFileName = `photo${photoIndex}${ext}`;
      const oldFilePath = path.join(photographyDir, file);
      const newFilePath = path.join(photographyDir, newFileName);

      // Rename the file asynchronously
      await fs.promises.rename(oldFilePath, newFilePath);
      console.log(`Renamed ${file} to ${newFileName}`);

      // Add watermark to the renamed image and overwrite the original image
      const watermarkText = '© Christian Graber';
      const watermarkedImagePath = await addWatermarkToImage(newFilePath, watermarkText);

      // Add the new photo object with the watermarked image path
      photoObjects[`photo${photoIndex}`] = {
        id: photoIndex,
        name: newFileName,
        path: `/photography/${path.basename(watermarkedImagePath)}`, // Path relative to your public folder
      };

      photoIndex++; // Increment the photo index for the next file
    }

    // Now, write the photoObjects to PhotoObject.js
    const photoObjectScript = `const photoObjects = ${JSON.stringify(photoObjects, null, 2)};\n\nmodule.exports = photoObjects;`;

    // Ensure we save the file correctly
    await fs.promises.writeFile(path.join(__dirname, 'PhotoObject.js'), photoObjectScript, 'utf8');
    console.log('PhotoObject.js has been saved successfully.');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the organization process
organizePhotos();
