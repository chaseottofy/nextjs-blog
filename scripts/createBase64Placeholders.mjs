import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const OUTPUT_IMAGE_QUALITY = 1; // (1-100)
const OUTPUT_IMAGE_SIZE = 0.1;  // (0-1)
const OUTPUT_BASE_DIRECTORY = '../public/images/';
const OUTPUT_FILE_NAME = 'imagePlaceholders';
const TS_OUTPUT_FINAL_PATH = `../data/image-placeholders.ts`;
const POSTS_DIRECTORY = 'posts/theme';
const PLACEHOLDERS_DIRECTORY = 'placeholders';
const IMAGE_FILE_EXTENSION = 'webp';
const DATA_URL_PREFIX = `data:image/${IMAGE_FILE_EXTENSION};base64,`;
const ACCEPTED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const ACCEPTED_BASE64_OUTPUT_TYPES = ['mdx', 'json', 'ts'];
const GENERATE_DEFAULT = true;
const DEFAULT_DURL = 'data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAQBQCdASp4ADQAP83m63K/tzKwIQjL8DmJZwDUUAAugkMb49zfs5rwC5dYGpByZ3gAAOyQQzvPlXrRH//LM4a9YNDdlw7tkmeJHUa5S9rs5O5HJ+AAiMRXtXZK06TRO+QAAA==';

// hack to allow __dirname
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

async function convertImageToBase64(filePath) {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString('base64');
}

// Define paths in outerscope to be used in both functions
const postsDirectory = path.join(__dirname, `${OUTPUT_BASE_DIRECTORY}/${POSTS_DIRECTORY}`);
const placeholderDirectory = path.join(__dirname, `${OUTPUT_BASE_DIRECTORY}/${PLACEHOLDERS_DIRECTORY}`);

// If paths do not exist, create them
if (!fs.existsSync(placeholderDirectory)) {
  fs.mkdirSync(placeholderDirectory, { recursive: true });
}

// Get all image files from posts directory
const files = fs.readdirSync(postsDirectory);
const imageFiles = files.filter(file => ACCEPTED_FILE_EXTENSIONS.some(ext => file.endsWith(ext)));

async function createImagePlaceholder() {
  const tasks = imageFiles.map(async (imageFile) => {
    const inputImagePath = path.join(postsDirectory, imageFile);
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const outputImagePath = path.join(placeholderDirectory, `${imageNameWithoutExt}_${PLACEHOLDERS_DIRECTORY}.${IMAGE_FILE_EXTENSION}`);

    // Read image dimensions without loading the whole image
    const imageMetadata = await sharp(inputImagePath).metadata();
    if (imageMetadata.width && imageMetadata.height) {
      // Convert image with 1% quality and save to placeholder directory
      return sharp(inputImagePath)
        .webp({ quality: OUTPUT_IMAGE_QUALITY })
        .resize(Math.round(imageMetadata.width * OUTPUT_IMAGE_SIZE), Math.round(imageMetadata.height * OUTPUT_IMAGE_SIZE))
        .toFile(outputImagePath);
    }
  });

  await Promise.all(tasks);
  console.log(`Processed ${tasks.length} images.`);
}

async function createBase64FromPlaceholder(type = 'ts') {
  if (!ACCEPTED_BASE64_OUTPUT_TYPES.includes(type)) {
    throw new Error(`Invalid type specified. Must be one of: ${ACCEPTED_BASE64_OUTPUT_TYPES.join(', ')}`);
  }

  const OUTPUT_FINAL_PATH = type === 'ts' ? path.join(__dirname, TS_OUTPUT_FINAL_PATH) : path.join(__dirname, `${OUTPUT_BASE_DIRECTORY}/${OUTPUT_FILE_NAME}.${type}`);

  const base64Tasks = imageFiles.map(async (imageFile) => {
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const outputImagePath = path.join(placeholderDirectory, `${imageNameWithoutExt}_${PLACEHOLDERS_DIRECTORY}.${IMAGE_FILE_EXTENSION}`);
    const base64String = await convertImageToBase64(outputImagePath);
    return { [imageNameWithoutExt]: base64String };
  });

  const base64Results = await Promise.all(base64Tasks);

  if (!fs.existsSync(OUTPUT_FINAL_PATH)) {
    fs.writeFileSync(OUTPUT_FINAL_PATH, '', err => {
      if (err) {
        console.log(err.message);
      }
      throw err;
    });
  }

  async function getResult() {
    const base64Object = {};
    const base64ObjectJSON = base64Results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    if (GENERATE_DEFAULT) {
      base64Object.default = DEFAULT_DURL;
    }
    const tasks = base64Results.map(async (result) => {
      const imageName = Object.keys(result)[0];
      const base64String = result[imageName];
      base64Object[imageName] = `${DATA_URL_PREFIX}${base64String}`;

      const stringified = JSON.stringify(base64Object, null, 2);
      const JSON_FIN = JSON.stringify(base64ObjectJSON, null, 2);
      const TYPESCRIPT_FIN = `const imagePlaceholders = ${stringified};\nexport default imagePlaceholders;\n`;
      const MDX_FIN = `export const imagePlaceholders = ${stringified};`;

      fs.writeFileSync(
        OUTPUT_FINAL_PATH,
        type === 'json' ? JSON_FIN : type === 'mdx' ? MDX_FIN : TYPESCRIPT_FIN,
        err => {
          if (err) {
            console.log(err.message);
          }
          throw err;
        });
    });
    await Promise.all(tasks);
  };
  await getResult();
}

createImagePlaceholder().catch(error => {
  console.error("Error processing images:", error);
}).then(() => {

  createBase64FromPlaceholder('ts').catch(error => {
    console.error("Error processing images:", error);
  });
});
