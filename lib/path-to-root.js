'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = pathToRoot;

var _times = require('lodash/fp/times');

var _times2 = _interopRequireDefault(_times);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Add pathToRoot to every {@link Definition}.
 * For example, the pathToRoot value will be `../` for a definition with dirname `example`.
 * @param {Dictionary} files
 * @param {int} [additionalLevels=0]
 */
function pathToRoot(files) {
  var additionalLevels = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];

  return files.map(function (f) {
    var d = f.dirname;
    var s = d.length ? d.split('/').map(function (_) {
      return '..';
    }) : [];

    (0, _times2['default'])(function () {
      return s.push('..');
    }, additionalLevels);

    return _extends({}, f, {

      pathToRoot: s.length ? s.join('/') + '/' : ''
    });
  });
}