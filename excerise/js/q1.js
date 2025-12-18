import fs from "fs/promises";
import fsn from "fs";
import path from "path";

const basepath = "D:\\Backend\\excerise";

const files = await fs.readdir(basepath);

for (const file of files) {

    const filePath = path.join(basepath, file);

    // skip folders
    if (fsn.lstatSync(filePath).isDirectory()) continue;

    const ext = path.extname(file).slice(1); // remove dot

    if (!ext) continue; // skip files without extension

    const extFolderPath = path.join(basepath, ext);

    // create folder if not exists
    if (!fsn.existsSync(extFolderPath)) {
        await fs.mkdir(extFolderPath);
    }

    // move file
    await fs.rename(
        filePath,
        path.join(extFolderPath, file)
    );

    console.log(`Moved ${file} → ${ext}/`);
}
