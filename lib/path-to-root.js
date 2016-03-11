import { cleanPath } from 'static-base/lib/utils';


export default function(files, deps) {
  return files.map((f) => {
    const d = cleanPath(f.dirname, { beginning: true, end: true });

    return {
      ...f,

      pathToRoot: d.length ?
        d.split('/').map(() => '..').join('/') + '/' :
        '',
    };
  });
}
