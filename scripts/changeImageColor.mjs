import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// TWO MODES: color and greyscale
const CHANGE_COLOR_MODES = {
  color: {
    modeName: 'color',
    outputDir: '1920x1080',
    rgb: { r: 18, g: 182, b: 251 },
    resize: true,
  },
  greyscale: {
    modeName: 'greyscale',
    outputDir: 'greyscale',
    rgb: null,
    resize: true,
  }
};

const RESIZE_OPTIONS = {
  width: 1920,
  height: 1080,
  fit: 'fill',
};

const QUALITY = 60;
const CURRENT_MODE = CHANGE_COLOR_MODES.color; // CHANGE_COLOR_MODES[0]

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

const POSTS_DIRECTORY = path.join(__dirname, '../public/images/posts');

function isRGB(obj) {
  const hasProps = obj.hasOwnProperty('r') && obj.hasOwnProperty('g') && obj.hasOwnProperty('b');
  if (!hasProps) return false;
  const verify = (val) => val >= 0 && val <= 255;
  const { r, g, b } = obj;
  return verify(r) && verify(g) && verify(b);
};

async function changeImageColor(mode) {
  if (!mode) {
    console.log('No mode specified.');
    return;
  }

  // const currentMode = CHANGE_COLOR_MODES.mode;
  const { modeName, outputDir, rgb, resize } = mode;

  if (modeName !== 'greyscale' && !isRGB(rgb)) {
    console.log('Invalid RGB value.');
    return;
  }

  const outputPathDir = path.join(POSTS_DIRECTORY, outputDir);
  const files = fs.readdirSync(POSTS_DIRECTORY);
  const imageFiles = files.filter(file => ['.jpg', '.jpeg', '.png', '.webp'].some(ext => file.endsWith(ext)));

  if (!imageFiles.length) {
    console.log('No images found.');
    return;
  }

  if (!fs.existsSync(outputPathDir)) {
    fs.mkdirSync(outputPathDir);
    console.log(`Created directory ${outputPathDir}.`);
  }

  const tasks = imageFiles.map(async (imageFile) => {
    const inputImagePath = path.join(POSTS_DIRECTORY, imageFile);
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const outputImagePath = path.join(outputPathDir, `${imageNameWithoutExt}.webp`);

    if (fs.existsSync(outputImagePath)) {
      fs.rmSync(outputImagePath, { recursive: true, force: true });
    }

    const imageMetadata = await sharp(inputImagePath).metadata();

    if (imageMetadata.width && imageMetadata.height) {
      const img = sharp(inputImagePath);
      if (modeName === 'greyscale') {
        img.greyscale();
      }

      if (modeName === 'color') {
        img.tint(rgb);
      }

      if (resize) {
        img.resize(RESIZE_OPTIONS);
      }

      return img
        .toBuffer()
        .then(data => {
          return sharp(data)
            .webp({
              quality: QUALITY,
              lossless: false,
              effort: 6,
            })
            .toFile(outputImagePath);
        });
    }
  });

  await Promise.all(tasks);
  console.log(`Processed ${tasks.length} images.`);
}

changeImageColor(CURRENT_MODE).catch(error => {
  console.error("Error processing images:", error);
});
