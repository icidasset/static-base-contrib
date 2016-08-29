import sortBy from 'lodash/fp/sortBy';


/**
 * Higher-order function that applies a filter to a part of a sequence.
 * @param {function} fn - Sequential function to execute on the filtered items
 * @param {function} condition - Filter condition
 */
export default function filter(func, condition) {
  return files => {
    const yes = [];
    const no = [];

    files.forEach(file => {
      if (condition(file)) yes.push(file);
      else no.push(file);
    });

    return Promise.resolve(func(yes)).then(processed => {
      return sortBy('path', [...processed, ...no]);
    });
  };
}
