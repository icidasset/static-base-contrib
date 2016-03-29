import { join } from 'path';


/**
 * Convert the path of every {@link Definition} to the format `dirname/index.extname`.
 * @param {Dictionary} files
 */
export default function permalinks(files) {
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
