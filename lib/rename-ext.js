'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (files, deps, replaceWith) {
  return files.map(function (f) {
    var cleanedPath = (0, _utils.cleanPath)(f.path.replace(new RegExp(f.extname + '$'), replaceWith), { beginning: true });

    return _extends({}, f, {

      path: cleanedPath,
      entirePath: (0, _path.join)(f.root, f.wd, cleanedPath),

      extname: replaceWith
    });
  });
};

var _path = require('path');

var _utils = require('static-base/lib/utils');