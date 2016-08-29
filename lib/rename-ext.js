'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = renameExt;

var _utils = require('./utils');

var _path = require('path');

/**
 * Change the extension/extname of every {@link Definition}.
 * @param {Dictionary} files
 * @param {string} replaceWith - The next extension (e.g. `.html`)
 */
function renameExt(files, replaceWith) {
  return files.map(function (f) {
    var cleanedPath = f.path.replace(new RegExp(f.extname + '$'), replaceWith);
    return _extends({}, f, (0, _utils.forkDefinition)(cleanedPath, f));
  });
}