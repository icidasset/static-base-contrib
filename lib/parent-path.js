'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = parentPath;

var _path = require('path');

/**
 * Add parentPath to every {@link Definition}.
 * Or in other words, the path for the parent directory.
 * Does not define this property if there is no parent directory.
 * @param {Dictionary} files
 */
function parentPath(files) {
  return files.map(function (f) {
    var directories = f.dirname.length ? f.dirname.split('/') : [];
    var parentPath = directories.map(function (d) {
      return '..';
    }).join('/');

    if (parentPath.length) return _extends({}, f, { parentPath: parentPath + '/' });
    return f;
  });
}