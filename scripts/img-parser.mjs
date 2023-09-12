import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import {
  initGlobalDirname,
  convertImageToBase64,
} from './utils.mjs';
import {
  defaultDataURL,
} from './defaults.mjs';

// hack to allow __dirname
initGlobalDirname();

/**
 * It is recommended to always just run 'npm run parseimg' to generate both placeholder images and base64 strings.
 * This will ensure that the placeholder images actually exist, as the base:64 strings can only be 
 * generated from the placeholder images.
 * 
 * AVAILABLE MODES AND CLI ARGUMENTS:
 * - 'npm run parseimg:placeholders' (generate placeholder images only)
 * - 'npm run parseimg:base64'       (generate base64 strings only)
 * - 'npm run parseimg'              (generate placeholder images then base64 strings)
 */

/**
 * @class ImageConfig
 * @description
 * - Contains all configuration options for the image parser
 * - All configuration options are set to default values that will most likely need to be changed 
 * to fit the folder/file structure of your project
 * 
 * @remarks
 * - Do not change any of the #private properties
 * - #mode is set via command line arguments (see comment at top of file)
 * - and the rest of the private #properties, 
 *   excluding #acceptedModes/#acceptedFileExtensions/#acceptedBase64OutputTypes/#dataUrlPrefix,
 *   are set at instantiation!
 * 
 * @remarks
 * - setters exist for most properties to allow for future cli arguments,
 *   as for now, they are not properly implemented.
 */
class ImageConfig {
  #mode = '';
  #acceptedModes = ['placeholder', 'base64', 'both'];

  #postsDirectory = '';
  #placeholdersDirectory = '';
  #output64Directory = '';

  #acceptedFileExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
  #acceptedBase64OutputTypes = ['mdx', 'json', 'ts'];

  #dataUrlPrefix = `data:image/webp;base64,`;

  constructor() {
    this._baseStartDirectory = '../public/images/posts';
    this._baseOutput64Directory = '../data';

    this._postsFolder = 'banners';

    this._postsPlaceholderFolder = 'placeholders';
    this._placeholderFileSuffix = '_placeholder';

    this._imageFileExtension = 'webp';
    this._outputImageQuality = 2;
    this._outputImageSize = 0.2;

    this._outputVariableName = 'imagePlaceholders';
    this._outputFilename = 'image-placeholders';
    this._outputFileExtension = 'ts';

    this._generateDefault = true;
    this._defaultDurl = defaultDataURL;
  }

  init() {
    this.initMode();
    this.initStartDirectory();
    this.initOutputDirectory();
  }

  initMode() {
    const args = process.argv.slice(2);
    for (const arg of args) {
      if (arg.startsWith('--mode=')) {
        const tempMode = arg.split('=')[1];
        if (!this.#acceptedModes.includes(tempMode)) {
          throw new Error(`Invalid mode specified. Must be one of: ${this.#acceptedModes.join(', ')}`);
        }
        this.#mode = arg.split('=')[1];
      }
    }
  }

  initStartDirectory() {
    this.#postsDirectory = path.join(
      __dirname,
      `${this._baseStartDirectory}/${this._postsFolder}`
    );
    this.#placeholdersDirectory = path.join(
      __dirname,
      `${this._baseStartDirectory}/${this._postsPlaceholderFolder}`
    );
  }

  initOutputDirectory() {
    this.#output64Directory = path.join(
      __dirname,
      `${this._baseOutput64Directory}/${this._outputFilename}.${this._outputFileExtension}`
    );
  }

  get mode() { return this.#mode; }
  get postsDirectory() { return this.#postsDirectory; }
  get acceptedImageFileExtensions() { return this.#acceptedFileExtensions; }
  get acceptedBase64OutputTypes() { return this.#acceptedBase64OutputTypes; }

  /**
   * @returns {string} - '_baseStartDirectory/_placeholderFolder'
   * @example '../public/images/posts/placeholders'
   */
  get placeholdersDirectory() { return this.#placeholdersDirectory; }
  get output64Directory() { return this.#output64Directory; }

  get baseStartDirectory() { return this._baseStartDirectory; }
  get baseOutput64Directory() { return this._baseOutput64Directory; }
  get postsFolder() { return this._postsFolder; }
  get postsPlaceholderFolder() { return this._postsPlaceholderFolder; }

  /**
   * @returns {string} - The suffix to be appended to the placeholder image file
   * @example 
   * - placeholderFileSuffix = '_placeholder'
   * - ../public/images/posts/placeholders/imageName${placeholderFileSuffix}.webp
   * - ../public/images/posts/placeholders/imageName_placeholder.webp
   */
  get placeholderFileSuffix() { return this._placeholderFileSuffix; }
  /** 
   * @param {string} value - The suffix to be appended to the placeholder image file 
   * @remarks
   * - Must only contain a-z, A-Z, 0-9, -, and _
   * - If you want to use a space, change the below regex to the following:
   * ```js
   * const regex = /[^a-zA-Z0-9-_ ]/g;
   * ```
  */
  set placeholderFileSuffix(value) {
    // write a regex to remove any character other than a-z, A-Z, 0-9, -, and _.
    const regex = /[^a-zA-Z0-9-_]/g;
    if (regex.test(value)) {
      throw new Error(`Invalid suffix specified. Must only contain a-z, A-Z, 0-9, -, and _`);
    }
    this._placeholderFileSuffix = value;
  }

  get dataUrlPrefix() { return this.#dataUrlPrefix; }
  get imageFileExtension() { return this._imageFileExtension; }
  /**
   * @param {string} value - The file extension of the images to be converted
   * - Must be one of: ['.jpg', '.jpeg', '.png', '.webp', '.avif']
   */
  set imageFileExtension(value) {
    if (!this.#acceptedFileExtensions.includes(value)) {
      throw new Error(`Invalid file extension specified. Must be one of: 
      ${this.#acceptedFileExtensions.join(', ')}`);
    }
    this._imageFileExtension = value;
    this.#dataUrlPrefix = `data:image/${value};base64;`;
  }

  get outputImageQuality() { return this._outputImageQuality; }
  /** @param {number} value - The quality of the output image (1-100)*/
  set outputImageQuality(value) {
    this._outputImageQuality = value;
  }

  get outputImageSize() { return this._outputImageSize; }
  /**
   * @param {number} value - Float value multiplier for the output image size (0-1)
   * - 0.2 = 20% of original image size
   * - 0.5 = 50% of original image size
   * - 1 = 100% of original image size
   */
  set outputImageSize(value) {
    if (value < 0 || value > 1) {
      throw new Error(`Invalid output image size specified. Must be between 0 and 1.`);
    }
    this._outputImageSize = value;
  }

  get outputVariableName() { return this._outputFileName; }
  /**
   * @param {string} value - The name of the variable created in output file
   * @example
   * - if outputVariableName = 'imagePlaceholders' && outputFileExtension = 'ts'
   * - the created object within the output file will be called 'imagePlaceholders'
   */
  set outputVariableName(value) {
    this._outputVariableName = value;
  }

  get outputFilename() { return this._outputFilename; }
  set outputFilename(value) {
    this._outputFilename = value;
    this.initOutputDirectory();
  }

  get outputFileExtension() { return this._outputFileExtension; }
  set outputFileExtension(value) {
    if (!this.#acceptedBase64OutputTypes.includes(value)) {
      throw new Error(`Invalid file extension specified. Must be one of:
      ${this.#acceptedBase64OutputTypes.join(', ')}`);
    }
    this._outputFileExtension = value;
    this.initOutputDirectory();
  }

  get generateDefault() { return this._generateDefault; }
  /** @param {boolean} value - Whether or not to generate a default durl */
  set generateDefault(value) { this._generateDefault = typeof value === 'boolean' ? value : true; }

  get defaultDurl() { return this._defaultDurl; }
  /**
   * @param {string} value - The default durl to be used for images that fail to load
   * @remarks
   * Will be specified in chosen output file as 'default' property
   */
  set defaultDurl(value) {
    const matches = value.match(/^data:image\/[a-zA-Z]+;base64,/);
    if (!matches) {
      throw new Error(`Invalid default durl specified. Must be a valid data url.`);
    }
    this._defaultDurl = value;
  }
}

const config = new ImageConfig();
config.init();

// If paths do not exist, create them
if (!fs.existsSync(config.postsDirectory)) {
  fs.mkdirSync(config.placeholdersDirectory, { recursive: true });
}

// Get all image files from posts directory
const files = fs.readdirSync(config.postsDirectory);
const imageFiles = files.filter(file => config.acceptedImageFileExtensions.some(ext => file.endsWith(ext)));

async function createImagePlaceholder() {
  const tasks = imageFiles.map(async (imageFile) => {
    const inputImagePath = path.join(config.postsDirectory, imageFile);
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const outputImagePath = path.join(
      config.placeholdersDirectory,
      `${imageNameWithoutExt}${config.placeholderFileSuffix}.${config.imageFileExtension}`
    );

    // Read image dimensions without loading the whole image
    const imageMetadata = await sharp(inputImagePath).metadata();
    if (imageMetadata.width && imageMetadata.height) {
      return sharp(inputImagePath)
        .webp({ quality: config.outputImageQuality })
        .blur()
        .resize(
          Math.round(imageMetadata.width * config.outputImageSize),
          Math.round(imageMetadata.height * config.outputImageSize)
        )
        .toFile(outputImagePath);
    }
  });
  await Promise.all(tasks);
  console.log(`Processed ${tasks.length} images.`);
}

async function createBase64FromPlaceholder(
  type = config.outputFileExtension
) {
  const outputFinalPath = config.output64Directory;
  const placeholderDirectory = config.placeholdersDirectory;
  const placeholderFileSuffix = config.placeholderFileSuffix;
  const imageFileExtension = config.imageFileExtension;

  const base64Tasks = imageFiles.map(async (imageFile) => {
    // get image name without extension i.e. 'image-name'
    // append placeholder suffix i.e. 'image-name_placeholder' & add extension i.e. 'webp'
    // join as 'image-name_placeholder.webp'
    const imageNameWithoutExt = path.basename(imageFile, path.extname(imageFile));
    const placeholderPath = `${imageNameWithoutExt}${placeholderFileSuffix}.${imageFileExtension}`;
    const outputImagePath = path.join(placeholderDirectory, placeholderPath);

    // convertImageToBase64 reads the file at the given path and returns a base64 string
    // if the file does not exist, it will throw an error

    const base64String = await convertImageToBase64(outputImagePath);
    return { [imageNameWithoutExt]: base64String };
  });

  const base64Results = await Promise.all(base64Tasks);
  if (!fs.existsSync(outputFinalPath)) {
    fs.writeFileSync(outputFinalPath, '', err => {
      if (err) { console.log(err.message); }
      throw err;
    });
  }

  async function getResult() {
    const base64Object = {};
    const base64DataPrefix = config.dataUrlPrefix;
    const base64VariableName = config.outputVariableName;
    const defaultDurl = config.defaultDurl;
    const base64ObjectJSON = base64Results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    if (config.generateDefault) { base64Object.default = defaultDurl; }

    const tasks = base64Results.map(async (result) => {
      const imageName = Object.keys(result)[0];
      const base64String = result[imageName];
      const base64Data = `${base64DataPrefix}${base64String}`;

      base64Object[imageName] = base64Data;
      const stringified = JSON.stringify(base64Object, null, 2);

      let RES;
      if (type === 'json') {
        RES = JSON.stringify(base64ObjectJSON, null, 2);
      } else if (type === 'mdx') {
        RES = `export const ${base64VariableName} = ${stringified};`;
      } else {
        RES = `const ${base64VariableName} = ${stringified};\nexport default ${base64VariableName};\n`;
      }

      fs.writeFileSync(outputFinalPath, RES, err => {
        if (err) { console.log(err.message); }
        throw err;
      });
    });
    await Promise.all(tasks);
  };
  await getResult();
}

const runPlaceholder = () => {
  createImagePlaceholder().catch(err => console.error("PLACEHOLDER processing error:", err));
};

const runBase64 = () => {
  createBase64FromPlaceholder(
    config.outputFileExtension
  ).catch(err => console.error("BASE64 processing error:", err));
};

const runBoth = () => {
  createImagePlaceholder()
    .catch(err => console.error("PLACEHOLDER processing error:", err))
    .then(() => createBase64FromPlaceholder(
      config.outputFileExtension
    ).catch(err => console.error("BASE64 processing error:", err)));
};

const init = () => {
  switch (config.mode) {
    case 'placeholder':
      runPlaceholder();
      break;
    case 'base64':
      runBase64();
      break;
    case 'both':
      runBoth();
      break;
    default:
      throw new Error(`Invalid mode specified. Must be one of: ${config.acceptedModes.join(', ')}`);
  }
};

init();
