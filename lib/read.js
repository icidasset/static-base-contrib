import fs from 'fs';


export default function(deps, files) {
  return files.map((f) => {
    return {
      ...f,
      content: fs.readFileSync(f.entirePath),
    };
  });
}
