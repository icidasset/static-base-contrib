import store from './utils/store';


export default function(files, deps, obj, options = {}) {
  return files.map((f) => {
    return store(f, obj, options.path);
  });
}
