'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = svgSprite;

var _svgSprite = require('svg-sprite');

var _svgSprite2 = _interopRequireDefault(_svgSprite);

var _dictionary = require('static-base/lib/dictionary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Make a svg sprite consisting out of the given {@link Definition}s.
 * @param {Dictionary} files
 * @param {string} config - configuration object for
                            [svg-sprite](https://github.com/jkphl/svg-sprite)
 */
function svgSprite(files) {
  var config = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];

  var spriter = new _svgSprite2['default'](config);
  var wd = void 0,
      root = void 0;

  files.forEach(function (file) {
    if (!wd) wd = file.wd;
    if (!root) root = file.root;

    spriter.add(file.entirePath, file.path, file.content);
  });

  if (files.length) return compile(spriter, wd, root);else return [].concat(_toConsumableArray(files));
}

/**
 * @private
 */
function compile(spriter, wd, root) {
  return new Promise(function (resolve, reject) {

    spriter.compile(function (err, result) {
      if (err) {
        reject(err);
      } else {
        (function () {
          var files = [];

          Object.keys(result).forEach(function (mode) {
            Object.keys(result[mode]).forEach(function (resource) {
              var data = result[mode][resource];
              var file = (0, _dictionary.buildDefinition)(data.relative, { wd: wd, root: root });
              file.content = data.contents.toString('utf-8');
              files.push(file);
            });
          });

          resolve(files);
        })();
      }
    });
  });
}