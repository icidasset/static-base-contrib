export default function(files, deps, additionalLevels = 0) {
  return files.map((f) => {
    const d = f.dirname;
    const s = d.length ? d.split('/').map(() => '..') : [];

    for (let i = 0; i < additionalLevels; ++i) {
      s.push('..');
    }

    return {
      ...f,

      pathToRoot: s.length ? s.join('/') + '/' : '',
    };
  });
}
