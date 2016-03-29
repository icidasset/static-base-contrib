import store from './utils/store';


/**
 * Add data to every {@link Definition}.
 * @param {Dictionary} files
 * @param {Object} data
 * @param {Object} [options]
 * @param {string} options.path
 */
export default function metadata(files, obj, options = {}) {
  return files.map((f) => {
    return store(f, obj, options.path);
  });
}
