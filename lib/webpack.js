'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = webpack;

var _staticBase = require('static-base');

var _path = require('path');

var _flatten = require('lodash/fp/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _optional = require('optional');

var _optional2 = _interopRequireDefault(_optional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var webpackLibrary = (0, _optional2['default'])('webpack');
var MemoryFileSystem = (0, _optional2['default'])('memory-fs');

/**
 * Execute a Webpack configuration,
 * and make a {@link Dictionary}.
 * @param {Dictionary} files
 * @param {Object} config - Webpack config object
 */
function webpack(files, config) {
  if (!webpackLibrary || !MemoryFileSystem) {
    throw 'You have to install `webpack` and `memory-fs` in order to use this function';
  }

  return new Promise(function (resolve, reject) {
    var compiler = webpackLibrary(config);

    if (!config.context) {
      return reject('static-base-contrib, webpack, you must set the `context` property');
    }

    if (!config.output.path) {
      return reject('static-base-contrib, webpack, you must set the `output.path` property');
    }

    compiler.outputFileSystem = new MemoryFileSystem();
    compiler.run(function (err, stats) {
      if (err) return reject(err);

      var fs = compiler.outputFileSystem;
      var webpackFiles = [];
      var info = stats.toString(config.stats);

      if (stats.hasErrors()) return reject(info);

      var deps = {
        wd: (0, _path.relative)(config.context, config.output.path),
        root: config.context
      };

      scan(fs, '', deps, webpackFiles);
      resolve([].concat(_toConsumableArray(files), webpackFiles));
    });
  });
}

function scan(fs, combinedPath, deps, collection) {
  var entirePath = (0, _path.join)(deps.root, deps.wd, combinedPath);

  fs.readdirSync(entirePath).forEach(function (name) {
    var p = (0, _path.join)(combinedPath, name);
    var e = (0, _path.join)(entirePath, name);

    if (fs.statSync(e).isDirectory()) {
      scan(fs, p, deps, collection);
    } else {
      var def = (0, _staticBase.buildDefinition)(p, deps);
      def.content = fs.readFileSync(def.entirePath, 'utf-8');
      collection.push(def);
    }
  });
}