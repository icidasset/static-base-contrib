'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = parentPath;

var _path = require('path');

var _utils = require('static-base/lib/utils');

/**
 * Add parentPath to every {@link Definition}.
 * @param {Dictionary} files
 */
function parentPath(files) {
  return files.map(function (f) {
    var dirs = f.dirname.length ? f.dirname.split('/') : [];
    var parent = dirs.map(function (d) {
      return '..';
    }).join('/');

    if (parent.length) return _extends({}, f, { parentPath: parent + '/' });
    return f;
  });
}