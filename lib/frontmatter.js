'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = frontmatter;

var _grayMatter = require('gray-matter');

var _grayMatter2 = _interopRequireDefault(_grayMatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Parses the frontmatter of every {@link Definition},
 * using the [gray-matter](https://www.npmjs.com/package/gray-matter) library.
 * Note that if you want to use something else than yaml, you have to pass along
 * the parser like so `{ parser: toml.parse, lang: 'toml' }`.
 * @param {Dictionary} files
 * @param {Object} [options] - Options to pass to `gray-matter`
 */
function frontmatter(files, options) {
  return files.map(function (f) {
    var m = (0, _grayMatter2['default'])(f.content, options);

    return _extends({}, f, m.data, {

      content: m.content
    });
  });
}