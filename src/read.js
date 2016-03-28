import fs from 'fs';


/**
 * Read the content of every {@link Definition} (aka file).
 * @param {Dictionary} files
 */
export default function(files) {
  return files.map((f) => {
    return {
      ...f,

      // get file contents
      content: fs.readFileSync(f.entirePath, 'utf-8'),
    };
  });
}
