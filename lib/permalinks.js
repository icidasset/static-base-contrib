import { cleanPath } from 'static-base/lib/utils';
import permalinks from 'permalinks';


export default function(files, deps) {
  return files.map((f) => {
    if (f.basename !== 'index') {
      return {
        ...f,

        path: cleanPath(
          permalinks(':dirname/:basename/index:extname', f),
          { beginning: true }
        ),
        basename: 'index',
        dirname: permalinks(':dirname/:basename', f)
      };
    }

    return f;
  });
}
