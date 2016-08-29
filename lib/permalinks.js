'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = permalinks;

var _path = require('path');

/**
 * Convert the path of every {@link Definition} to the format `dirname/index.extname`.
 * Does not change definitions that already have the basename 'index'.
 * @param {Dictionary} files
 */
function permalinks(files) {
  return files.map(function (f) {
    if (f.basename !== 'index') {
      return _extends({}, f, {

        path: (0, _path.join)(f.dirname, f.basename, 'index' + f.extname),
        basename: 'index',
        dirname: (0, _path.join)(f.dirname, f.basename)
      });
    }

    return f;
  });
}