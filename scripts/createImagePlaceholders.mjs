import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function get__filename() {
  const error = new Error();
  const stack = error.stack;
  const match = stack.match(/^Error\s+at[^\r\n]+\s+at *(?:[^\r\n(]+\((.+?)(?::\d+:\d+)?\)|(.+?)(?::\d+:\d+)?) *([\r\n]|$)/);
  const filename = match[1] || match[2];
  if (filename.startsWith('file://')) {
    return fileURLToPath(filename);
  }
  return filename;
}

if (typeof __filename === 'undefined') {
  global.__filename = get__filename();
  global.__dirname = path.dirname(__filename);
}

async function createImagePlaceholder() {
  const postsDirectory = path.join(__dirname, '../public/images/posts');
  const placeholderDirectory = path.join(__dirname, '../public/images/placeholders');
  if (!fs.existsSync(placeholderDirectory)) {
    fs.mkdirSync(placeholderDirectory, { recursive: true });
  }

  const files = fs.readdirSync(postsDirectory);
  const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.webp'].some(ext => file.endsWith(ext)));

  const tasks = imageFiles.map(async (imageFile) => {
    const inputImagePath = path.join(postsDirectory, imageFile);
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const outputImagePath = path.join(placeholderDirectory, `${imageNameWithoutExt}_placeholder.webp`);

    // Read image dimensions without loading the whole image
    const imageMetadata = await sharp(inputImagePath).metadata();

    if (imageMetadata.width && imageMetadata.height) {
      // Convert image with 1% quality and save to placeholder directory
      return sharp(inputImagePath)
        .webp({ quality: 1 })
        .resize(Math.round(imageMetadata.width * 0.1), Math.round(imageMetadata.height * 0.1))
        .toFile(outputImagePath);
    }
  });

  await Promise.all(tasks);
  console.log(`Processed ${tasks.length} images.`);
}

createImagePlaceholder().catch(error => {
  console.error("Error processing images:", error);
});
