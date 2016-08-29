'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = copy;

var _path = require('path');

var _optional = require('optional');

var _optional2 = _interopRequireDefault(_optional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var enfscopy = (0, _optional2['default'])('enfscopy');

/**
 * Copy every {@link Definition} to a destination directory.
 * @param {Dictionary} files
 * @param {string} destination
 */
function copy(files, destination) {
  if (!enfscopy) {
    throw 'You have to install `enfscopy` in order to use this function';
  }

  return files.map(function (f) {
    return doCopy(f, destination);
  }).reduce(function (promise, fn) {
    return promise.then(fn);
  }, Promise.resolve()).then(function () {
    return [].concat(_toConsumableArray(files));
  });
}

var doCopy = function doCopy(f, destination) {
  return enfscopy.copySync(f.entirePath, (0, _path.join)(f.root, destination, f.path));
};