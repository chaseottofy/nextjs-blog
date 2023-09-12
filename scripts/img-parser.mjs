import sharp from 'sharp';
import fs from 'fs';
import { 
  initGlobalDirname,
  convertImageToBase64,
} from './utils.mjs';
import path from 'path';

initGlobalDirname();
/*
package.json scripts:
- 'npm run parseimg:placeholders' (generate placeholder images only)
- 'npm run parseimg:base64'       (generate base64 strings only)
- 'npm run parseimg'              (generate placeholder images then base64 strings)
*/

// convert the following constants to be represented in a class with getters and setters
const OUTPUT_IMAGE_QUALITY = 2; // (1-100)
const OUTPUT_IMAGE_SIZE = 0.2;  // (0-1)
const OUTPUT_BASE_DIRECTORY = '../public/images/';
const OUTPUT_FILE_NAME = 'imagePlaceholders';
const TS_OUTPUT_FINAL_PATH = `../data/image-placeholders.ts`;

const POSTS_FOLDER = 'greyscale';
const POSTS_DIRECTORY = `posts/${POSTS_FOLDER}`;
const PLACEHOLDERS_DIRECTORY = 'placeholders';

const IMAGE_FILE_EXTENSION = 'webp';
const DATA_URL_PREFIX = `data:image/${IMAGE_FILE_EXTENSION};base64,`;
const ACCEPTED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const ACCEPTED_BASE64_OUTPUT_TYPES = ['mdx', 'json', 'ts'];

const GENERATE_DEFAULT = true;
const DEFAULT_DURL = 'data:image/webp;base64,UklGRhgCAABXRUJQVlA4IAwCAADQIQCdASqAAdgAP73e6G2+NzGqI3MpY8A3iWdu4WL9/zmekavyRX/3QGpmsqQeS0KmGaypB5OF5B5L5tN4eFl7slbA3Vf2Q9W1s5mRUZ+QeS0KmHgzkQUF9SnMTjXYQnlog7NChPK4lTLyDD/ZU9bLVG+QZ+EUWD3jAZE8OQc8NcATtQf4p/7HdwPGHe2D7NkDv29tprwy4ffQTqO8ozkoQ6nkcli4xyTtaw/eF0qNGTgCDKO6jTYCI5qtL2TnE61xJ5zb8/CYOueE3YcbrlvFtjbczoPJBncjtpIDnbvJZMYs13zLB7Ij4/9DgJGXEodR0Q8coZrQcYzfGKSfXQSLDtxTt7PzS2KfSLuoxZSDyWqQoW13gmAA/vKPN/JfBrevOtSH2KAYXunT7dxfmVqagf2QA4tJbsAAAxWgggbGNyYE23XgAeiqHd5T3hekwNLAwVLu7QiT/FH+peWW1tL2dpsHsudTaRZvM27USrXz5p1PdjyzzYbBsfasTVVYzxAB+whCWML4z5kL1Sq4imRy0KsrTvUs3hNgNmH4rZ5FZEBLLXBytSDzH/L2fUllvfFvij73mAtP+j0pK9xoIvUx/gSyQlYwnyDPoYbQ/g7WXgGVFLh14Kp/VfQBOGvtLn4IBC3J9LJj5Lpz+Uv0YNELuEyAVeyzmCFYhEgzVEieBBghACY8nrEZcgAAAA==';

let MODE = '';
const args = process.argv.slice(2);
for (const arg of args) {
  if (arg.startsWith('--mode=')) {
    MODE = arg.split('=')[1];
  }
}

// async function convertImageToBase64(filePath) {
//   const buffer = await fs.promises.readFile(filePath);
//   return buffer.toString('base64');
// }

// Define paths in outerscope to be used in both functions
const postsDirectory = path.join(__dirname, `${OUTPUT_BASE_DIRECTORY}/${POSTS_DIRECTORY}`);
// const postsDirectory = path.join(__dirname, `${OUTPUT_BASE_DIRECTORY}/${POSTS_DIRECTORY}`);
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
        .blur()
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

if (MODE === 'placeholder') {
  createImagePlaceholder().catch(error => {
    console.error("Error processing images:", error);
  });
} else if (MODE === 'base64') {
  createBase64FromPlaceholder('ts').catch(error => {
    console.error("Error processing images:", error);
  });
} else if (MODE === 'both') {
  createImagePlaceholder().catch(error => {
    console.error("Error processing images:", error);
  }).then(() => {
    createBase64FromPlaceholder('ts').catch(error => {
      console.error("Error processing images:", error);
    });
  });
} else {
  throw new Error(`Invalid mode specified. Must be one of: placeholder, base64, both`);
}
