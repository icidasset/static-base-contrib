import { join } from 'path';
import copy from 'copy';


export default function(files, deps, destination) {
  files.forEach((f) => {
    copy.sync(
      files.map(f => f.entirePath),
      join(f.root, destination, f.path)
    )
  });

  return [...files];
}
