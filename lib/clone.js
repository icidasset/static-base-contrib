'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = clone;

var _rename = require('./rename');

var _rename2 = _interopRequireDefault(_rename);

var _sortBy = require('lodash/fp/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Clone a specific {@link Definition}.
 * @param {Dictionary} files
 * @param {string} path - Find a {@link Definition} with this path
 * @param {string} newPath - The path for the cloned {@link Definition}
 */
function clone(files, path, newPath) {
  var file = files.find(function (f) {
    return f.path === path;
  });
  return file ? (0, _sortBy2['default'])('path', files.concat((0, _rename2['default'])([file], path, newPath))) : [].concat(_toConsumableArray(files));
}