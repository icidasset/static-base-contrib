# Static Base Contrib

Functions you can use with [static-base](https://github.com/icidasset/static-base).



## Documentation

[http://icidasset.github.io/static-base-contrib](http://icidasset.github.io/static-base-contrib)



## Usage

```js
import { read } from 'static-base-contrib';
import { filter, forkDefinition } from 'static-base-contrib/utils';
```

See the docs and [static-base](https://github.com/icidasset/static-base) for more details.


### IMPORTANT NOTE

I tried to design this package to use the smallest amount of dependencies as possible,
so there a few functions that use libraries that are not dependencies of this package:

- __copy__, install `enfscopy` (designed with `v0.1.x`)
- __frontmatter__, install `gray-matter` (designed with `v2.x`)
- __svg-sprite__, install `svg-sprite` (designed with `v1.x`)
- __webpack__, install `webpack` and `memory-fs` (designed with `v1.x` and `v0.3.x`)

Peer dependencies:

- __lodash__, `v4.x`
- __static-base__, `v1.x`
