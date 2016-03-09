export default function(files, deps) {
  return files.map((f) => {
    return {
      ...f,

      pathToRoot: f.dirname.length ?
        f.dirname.split('/').map(() => '..').join('/') + '/' :
        '',
    };
  });
}
