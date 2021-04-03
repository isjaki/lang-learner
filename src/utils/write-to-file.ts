import path from 'path';
import { promises as fs } from 'fs';

import { root } from './root';

/**
 * Asynchronously writes data to a file, replacing the file if it already exists 
 * @param {string} filename file name with an extention
 * @param {string | Buffer} data data to write
 */
export async function writeToFile(filename: string, data: string | Buffer): Promise<void> {
    try {
        await fs.writeFile(path.join(root, filename), data);
    } catch (e) {
        console.log(e);
    }
}
