import { join } from 'path';
import fse from 'fs-extra';


export default function(files, deps, destination) {
  files.forEach((f) => {
    fse.copySync(
      f.entirePath,
      join(f.root, destination, f.path)
    );
  });

  return [...files];
}
