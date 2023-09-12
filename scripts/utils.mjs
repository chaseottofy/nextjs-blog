import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function get__filename() {
  const stack = new Error().stack;
  const match = stack.match(/^Error\s+at[^\r\n]+\s+at *(?:[^\r\n(]+\((.+?)(?::\d+:\d+)?\)|(.+?)(?::\d+:\d+)?) *([\r\n]|$)/);
  const filename = match[1] || match[2];
  if (filename.startsWith('file://')) { return fileURLToPath(filename); }
  return filename;
}

// hack to allow __dirname
export function initGlobalDirname() {
  if (typeof __filename === 'undefined') {
    global.__filename = get__filename();
    global.__dirname = path.dirname(__filename);
  }
}

export async function convertImageToBase64(filePath) {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString('base64');
}
