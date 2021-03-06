'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = metadata;

var _store = require('./utils/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Add data to every {@link Definition}.
 * @param {Dictionary} files
 * @param {Object} data
 * @param {Object} [options]
 * @param {string} options.path
 */
function metadata(files, data) {
  var options = arguments.length <= 2 || arguments[2] === void 0 ? {} : arguments[2];

  return files.map(function (f) {
    return (0, _store2['default'])(f, data, options.path);
  });
}