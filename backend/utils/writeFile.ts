import fs from 'fs/promises';
import path from 'path';

const writeFile = (filePath: string, data: string): Promise<void> => {
  return fs.writeFile(path.join(filePath), data);
};

export default writeFile;
