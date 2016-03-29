'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = write;

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Write the content of every {@link Definition} (aka file) to disk.
 * @param {Dictionary} files
 * @param {string} destination
 */
function write(files, destination) {
  var promises = files.map(function (f) {
    return new Promise(function (resolve, reject) {
      var dir = (0, _path.join)(f.root, destination, f.dirname);

      // ensure the directory tree exists
      (0, _mkdirp2['default'])(dir, function (err) {
        if (err) return reject(err);

        // write to file
        _fs2['default'].writeFile((0, _path.join)(dir, '' + f.basename + f.extname), f.content, { encoding: 'utf-8' }, function (err) {
          return err ? reject(err) : resolve(f);
        });
      });
    });
  });

  return Promise.all(promises);
}