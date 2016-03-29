'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = read;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Read the content of every {@link Definition} (aka file).
 * @param {Dictionary} files
 */
function read(files) {
  var promises = files.map(function (f) {
    return new Promise(function (resolve, reject) {
      _fs2['default'].readFile(f.entirePath, { encoding: 'utf-8' }, function (err, content) {
        return err ? reject(err) : resolve(_extends({}, f, { content: content }));
      });
    });
  });

  return Promise.all(promises);
}