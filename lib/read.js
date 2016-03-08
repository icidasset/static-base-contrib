import fs from 'fs';


export default function(files, deps) {
  return files.map((f) => {
    return {
      ...f,

      // get file contents
      content: fs.readFileSync(f.entirePath, 'utf-8'),
    };
  });
}
