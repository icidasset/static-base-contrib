import { join } from 'path';


export default function(files, deps) {
  return files.map((f) => {
    if (f.basename !== 'index') {
      return {
        ...f,

        path: join(f.dirname, f.basename, `index${f.extname}`),
        basename: 'index',
        dirname: join(f.dirname, f.basename),
      };
    }

    return f;
  });
}
