'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Read the content of every {@link Definition} (aka file).
 * @param {Dictionary} files
 */


exports['default'] = function (files) {
  return files.map(function (f) {
    return _extends({}, f, {

      // get file contents
      content: _fs2['default'].readFileSync(f.entirePath, 'utf-8')
    });
  });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }