'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (files, destination) {
  files.forEach(function (f) {
    var dir = (0, _path.join)(f.root, destination, f.dirname);

    // ensure the directory tree exists
    _mkdirp2['default'].sync(dir);

    // write to file
    _fs2['default'].writeFileSync((0, _path.join)(dir, '' + f.basename + f.extname), f.content);
  });

  return [].concat(_toConsumableArray(files));
};

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Write the content of every {@link Definition} (aka file) to disk.
 * @param {Dictionary} files
 * @param {string} destination
 */