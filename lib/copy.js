import copy from 'copy';
import pathUtils from 'path';


export default function(destination, deps, files) {
  files.forEach((f) => {
    copy.sync(
      files.map(f => f.entirePath),
      path.join(f.root, destination, f.path)
    )
  });

  return [...files];
}
