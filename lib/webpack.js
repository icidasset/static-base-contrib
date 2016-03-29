'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = webpack;

var _path = require('path');

var _dictionary = require('static-base/lib/dictionary');

var _flatten = require('lodash/fp/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Execute a Webpack configuration,
 * and make a {@link Dictionary}.
 * @param {Dictionary} files
 * @param {Object} config - Webpack config object
 */
function webpack(files, config) {
  return new Promise(function (resolve, reject) {
    var compiler = (0, _webpack2['default'])(config);

    if (!config.context) {
      return reject('static-base-contrib, webpack, you must set the `context` property');
    }

    if (!config.output.path) {
      return reject('static-base-contrib, webpack, you must set the `output.path` property');
    }

    compiler.outputFileSystem = new _memoryFs2['default']();
    compiler.run(function (err, stats) {
      if (err) return reject(err);

      var fs = compiler.outputFileSystem;
      var webpackFiles = [];
      var info = stats.toString();

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
      var def = (0, _dictionary.buildDefinition)(p, deps);
      def.content = fs.readFileSync(def.entirePath, 'utf-8');
      collection.push(def);
    }
  });
}