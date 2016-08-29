import times from 'lodash/fp/times';


/**
 * Add pathToRoot to every {@link Definition}.
 * For example, the pathToRoot value will be `../` for a definition with dirname `example`.
 * @param {Dictionary} files
 * @param {int} [additionalLevels=0]
 */
export default function pathToRoot(files, additionalLevels = 0) {
  return files.map(f => {
    const d = f.dirname;
    const s = d.length ? d.split('/').map(_ => '..') : [];

    times(
      () => s.push('..'),
      additionalLevels
    );

    return {
      ...f,

      pathToRoot: s.length ? s.join('/') + '/' : '',
    };
  });
}
