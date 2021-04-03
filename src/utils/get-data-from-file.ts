import path from 'path';
import { promises as fs } from 'fs';

import { root } from './root';

/**
 * Gets data from a file
 * @param {string} filename file name with an extention
 */
export async function getDataFromFile(filename: string): Promise<string | undefined> {
    try {
        return await fs.readFile(path.join(root, filename), 'utf-8');
    } catch (e) {
        console.log(e);
    }
}
