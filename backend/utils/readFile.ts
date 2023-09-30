import fs from 'fs/promises';
import path from 'path';

const readFile = (filePath: string): Promise<string> => {
  return fs.readFile(path.join(filePath), {
    encoding: 'utf-8',
  });
};

export default readFile;
