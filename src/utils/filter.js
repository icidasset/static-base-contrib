import sortBy from 'lodash/fp/sortBy';


/**
 * Apply a filter to a part of a sequence.
 * @param {function} fn - Sequential function to execute on the filtered items
 * @param {function} condition - Filter condition
 */
export default function(fn, condition) {
  return (files, deps) => {
    return new Promise(resolve => {

      const yes = [];
      const no = [];

      files.forEach(file => {
        if (condition(file)) yes.push(file);
        else no.push(file);
      });

      Promise.resolve(fn(yes, deps)).then(processed => {
        resolve(sortBy('path', [...processed, ...no]));
      });

    });
  };
}
