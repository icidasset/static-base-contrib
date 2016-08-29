import store from './utils/store';


/**
 * Add data to every {@link Definition}.
 * @param {Dictionary} files
 * @param {Object} data
 * @param {Object} [options]
 * @param {string} options.path
 */
export default function metadata(files, data, options = {}) {
  return files.map(f => store(f, data, options.path));
}
