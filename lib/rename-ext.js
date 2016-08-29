'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    return (0, _utils.forkDefinition)(cleanedPath, f);
  });
}