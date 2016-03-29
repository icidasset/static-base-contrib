'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = copy;

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Copy every {@link Definition} to a destination directory
 * @param {Dictionary} files
 * @param {string} destination
 */
function copy(files, destination) {
  var promises = files.map(function (f) {
    return new Promise(function (resolve, reject) {
      try {
        _fsExtra2['default'].copySync(f.entirePath, (0, _path.join)(f.root, destination, f.path));

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });

  // copy one by one
  return promises.reduce(function (promise, fn) {
    return promise.then(fn);
  }, Promise.resolve()).then(function () {
    return [].concat(_toConsumableArray(files));
  });
}