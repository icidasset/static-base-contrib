import update from 'lodash/fp/update';


export default function(target, obj, path) {
  let n;

  if (path) {
    n = { ...target };
    update((x) => x ? { ...x, ...obj } : { ...obj }, path, n);
  } else {
    n = { ...target, ...obj };
  }

  return n;
}
