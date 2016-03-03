import pathUtils from 'path';
import permalinks from 'permalinks';


export default function(deps, files) {
  return files.map((f) => {
    if (f.basename !== 'index') {
      return {
        ...f,

        path: permalinks(':dirname/:basename/index:ext', f),
        basename: 'index',
      };
    }

    return f;
  });
}
