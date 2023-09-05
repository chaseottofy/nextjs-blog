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

async function changeImageColor() {
  const postsDirectory = path.join(__dirname, '../public/images/posts');
  const outputPathDir = path.join(postsDirectory, `/theme/`);

  const files = fs.readdirSync(postsDirectory);
  const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.webp'].some(ext => file.endsWith(ext)));

  if (!imageFiles.length) {
    console.log('No images found.');
    return;
  }

  if (!fs.existsSync(outputPathDir)) {
    fs.mkdirSync(outputPathDir);
  }

  const tasks = imageFiles.map(async (imageFile) => {
    const inputImagePath = path.join(postsDirectory, imageFile);
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    // const outputPath = `../public/images/posts/theme`;
    const outputImagePath = path.join(outputPathDir, `${imageNameWithoutExt}_blue.webp`);

    if (fs.existsSync(outputImagePath)) {
      fs.rmSync(outputImagePath, { recursive: true, force: true });
    }

    // Read image dimensions without loading the whole image
    const imageMetadata = await sharp(inputImagePath).metadata();

    // .tint({ r: 0, g: 180, b: 255, alpha: .9 })
    // .modulate({ hue: 180 })
    // .webp({ quality: 90 })
    // .toFile(outputImagePath);
    if (imageMetadata.width && imageMetadata.height) {
      return sharp(inputImagePath)
        // .flatten({ background: '#0761D1' })
        .greyscale()
        .toBuffer()
        .then(data => {
          return sharp(data)
            .webp({ quality: 90 })
            .toFile(outputImagePath);
        });
    }
  });

  // Execute all the tasks
  await Promise.all(tasks);
  console.log(`Processed ${tasks.length} images.`);
}

changeImageColor().catch(error => {
  console.error("Error processing images:", error);
});
