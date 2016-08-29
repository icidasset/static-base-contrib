'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = svgSprite;

var _staticBase = require('static-base');

var _optional = require('optional');

var _optional2 = _interopRequireDefault(_optional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SVGSprite = (0, _optional2['default'])('svg-sprite');

/**
 * Make a svg sprite consisting out of the given {@link Definition}s.
 * @param {Dictionary} files
 * @param {string} config - Configuration object for
                            [svg-sprite](https://github.com/jkphl/svg-sprite)
 */
function svgSprite(files) {
  var config = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];

  if (!SVGSprite) {
    throw 'You have to install `svg-sprite` in order to use this function';
  }

  var spriter = new SVGSprite(config);
  var wd = void 0,
      root = void 0;

  files.forEach(function (f) {
    if (!wd) wd = f.wd;
    if (!root) root = f.root;

    spriter.add(f.entirePath, f.path, f.content);
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
              var file = (0, _staticBase.buildDefinition)(data.relative, { wd: wd, root: root });
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