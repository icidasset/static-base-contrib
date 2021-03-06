'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = frontmatter;
var optional = require('optional');
var matter = optional('gray-matter');

/**
 * Parses the frontmatter of every {@link Definition},
 * using the [gray-matter](https://www.npmjs.com/package/gray-matter) library.
 * Note that if you want to use something else than yaml, you have to pass along
 * the parser like so `{ parser: toml.parse, lang: 'toml' }`.
 * @param {Dictionary} files
 * @param {Object} [options] - Options to pass to `gray-matter`
 */
function frontmatter(files, options) {
  if (!matter) {
    throw 'You have to install `gray-matter` in order to use this function';
  }

  return files.map(function (f) {
    var _matter = matter(f.content, options);

    var content = _matter.content;
    var data = _matter.data;


    return _extends({}, f, data, {

      content: content
    });
  });
}