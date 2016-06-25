import fs from 'fs';
import Mustache from 'mustache';
import test from 'ava';
import toml from 'toml';

import { join } from 'path';
import { run } from 'static-base';

import { copy, frontmatter, metadata, parentPath } from './lib';
import { pathToRoot, permalinks, read, renameExt } from './lib';
import { svgSprite, templates, webpack, write } from './lib';


const root = process.cwd();


test('copy', async t => {
  return run(
    [copy, 'build/copy']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => {
      t.is(files[0].path, 'example.md');
      t.is(fsread('build/copy/example.md'), '# Example\n');
    },
    handleError(t)
  )
});


test('frontmatter', async t => {
  return run(
    [read],
    [frontmatter, { parser: toml.parse, lang: 'toml' }]
  )(
    'test/fixtures/frontmatter.md',
    root
  ).then(
    (files) => {
      t.is(files[0].category, 'Testing');
    },
    handleError(t)
  )
});


test('metadata', async t => {
  return run(
    [inject()],
    [metadata, { test: true }]
  )().then(
    (files) => t.is(files[0].test, true),
    handleError(t)
  );
});


test('parent-path - 1', async t => {
  return run(
    [inject({ dirname: 'test' })],
    [parentPath]
  )().then(
    (files) => t.is(files[0].parentPath, '../'),
    handleError(t)
  );
});


test('parent-path - 2', async t => {
  return run(
    [inject({ dirname: '' })],
    [parentPath]
  )().then(
    (files) => t.is(files[0].parentPath, undefined),
    handleError(t)
  );
});


test('path-to-root', async t => {
  return run(
    [inject({ dirname: 'test/yo' })],
    [pathToRoot]
  )().then(
    (files) => t.is(files[0].pathToRoot, '../../'),
    handleError(t)
  );
});


test('permalinks', async t => {
  return run(
    [permalinks]
  )(
    'test/fixtures/template.mu',
    root
  ).then(
    (files) => t.is(files[0].path, 'template/index.mu'),
    handleError(t)
  );
});


test('read', async t => {
  return run(
    [read]
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => t.is(files[0].content, '# Example\n'),
    handleError(t)
  );
});


test('rename-ext', async t => {
  return run(
    [renameExt, '.html']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => t.is(files[0].extname, '.html'),
    handleError(t)
  );
});


test('svg-sprite', async t => {
  return run(
    [read],
    [svgSprite, {
      mode: { symbol: {
        dest: '.',
        sprite: 'sprite.svg',
      }},
    }]
  )(
    'test/fixtures/**/*.svg',
    root
  ).then(
    (files) => {
      t.is(files[0].basename, 'sprite');
      t.is(files[0].extname, '.svg');
    },
    handleError(t)
  );
});


test('templates - 1', async t => {
  return run(
    [read],
    [metadata, { layout: 'test/fixtures/layout.mu', attr: 'ATTR_TEST' }],
    [templates, renderer]
  )(
    'test/fixtures/template.mu',
    root
  ).then(
    (files) => {
      const f = files[0];

      t.regex(f.content, /DOCTYPE/);
      t.regex(f.content, /<h1>/);
      t.regex(f.content, /ATTR_TEST/);
    },
    handleError(t)
  );
});


test('templates - 2', async t => {
  return run(
    [read],
    [templates, renderer, { layout: 'test/fixtures/layout.mu', onlyApplyLayout: true }]
  )(
    'test/fixtures/template.mu',
    root
  ).then(
    (files) => {
      const f = files[0];

      t.regex(f.content, /DOCTYPE/);
      t.regex(f.content, /<h1>/);
      t.regex(f.content, /\{\{attr\}\}/);
    },
    handleError(t)
  );
});


test('webpack', async t => {
  return run(
    [webpack, {
      entry: {
        example: join(root, 'test/fixtures/example.js')
      },
      context: root,
      output: {
        filename: 'assets/[name].js',
        path: join(root, 'build'),
      },
    }],
  )().then(
    (files) => {
      const f = files[0];

      t.is(f.path, 'assets/example.js');
      t.is(f.wd, 'build');
      t.is(f.dirname, 'assets');
      t.regex(f.content, /\'world\'/);
    },
    handleError(t)
  );
});


test('write', async t => {
  return run(
    [read],
    [write, 'build']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => {
      const f = files[0];

      return new Promise((resolve, reject) => {
        fs.readFile(f.entirePath, { encoding: 'utf-8' }, (err, content) => {
          if (err) return reject(err);
          t.is(content, '# Example\n')
          resolve();
        });
      });
    },
    handleError(t)
  );
});


/*

  Utilities

*/


function fsread(partialPath) {
  return fs.readFileSync(join(root, partialPath), 'utf-8');
}


function inject(data = {}) {
  return () => [data];
}


function renderer(template, data) {
  return Promise.resolve(Mustache.render(template, data));
}


function handleError(t) {
  return (err) => t.fail(err.toString());
}
