import update from 'lodash/fp/update';


/**
 * Clone source object and then copy in another object at a certain path or root.
 * @param {Object} src - Source object
 * @param {Object} obj - Another object
 * @param {string} [path] - Path in the source object
 */
export default function store(src, obj, path) {
  let n;

  if (path) {
    n = { ...src };
    update(x => x ? { ...x, ...obj } : { ...obj }, path, n);
  } else {
    n = { ...src, ...obj };
  }

  return n;
}
