const optional = require('optional');
const matter = optional('gray-matter');


/**
 * Parses the frontmatter of every {@link Definition},
 * using the [gray-matter](https://www.npmjs.com/package/gray-matter) library.
 * Note that if you want to use something else than yaml, you have to pass along
 * the parser like so `{ parser: toml.parse, lang: 'toml' }`.
 * @param {Dictionary} files
 * @param {Object} [options] - Options to pass to `gray-matter`
 */
export default function frontmatter(files, options) {
  if (!matter) {
    throw 'You have to install `gray-matter` in order to use this function';
  }

  return files.map(f => {
    const { content, data } = matter(f.content, options);

    return {
      ...f,
      ...data,

      content,
    };
  });
}
