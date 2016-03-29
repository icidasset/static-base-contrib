import fs from 'fs';


/**
 * Read the content of every {@link Definition} (aka file).
 * @param {Dictionary} files
 */
export default function read(files) {
  const promises = files.map(f => {
    return new Promise((resolve, reject) => {
      fs.readFile(
        f.entirePath,
        { encoding: 'utf-8' },
        (err, content) => err ? reject(err) : resolve({ ...f, content })
      );
    });
  });

  return Promise.all(promises);
}
