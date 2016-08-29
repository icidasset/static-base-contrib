'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = rename;

var _utils = require('./utils');

/**
 * Change the path of a specific {@link Definition}.
 * @param {Dictionary} files
 * @param {string} oldPath - Find a {@link Definition} with this path
 * @param {string} newPath - The new path for the matched {@link Definition}
 */
function rename(files, oldPath, newPath) {
  return files.map(function (f) {
    return f.path === oldPath ? _extends({}, f, (0, _utils.forkDefinition)(newPath, f)) : f;
  });
}