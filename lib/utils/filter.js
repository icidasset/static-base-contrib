'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = filter;

var _sortBy = require('lodash/fp/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Higher-order function that applies a filter to a part of a sequence.
 * @param {function} fn - Sequential function to execute on the filtered items
 * @param {function} condition - Filter condition
 */
function filter(func, condition) {
  return function (files) {
    var yes = [];
    var no = [];

    files.forEach(function (file) {
      if (condition(file)) yes.push(file);else no.push(file);
    });

    return Promise.resolve(func(yes)).then(function (processed) {
      return (0, _sortBy2['default'])('path', [].concat(_toConsumableArray(processed), no));
    });
  };
}