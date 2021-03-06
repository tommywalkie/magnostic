# magnostic 🧲

![status](https://img.shields.io/github/workflow/status/tommywalkie/magnostic/main?label=build) [![npm](https://img.shields.io/npm/v/magnostic)](https://www.npmjs.com/package/magnostic) [![minified gzip size](https://img.shields.io/bundlephobia/minzip/magnostic)](https://bundlephobia.com/result?p=magnostic@latest) ![dependency count](https://badgen.net/bundlephobia/dependency-count/magnostic) ![license](https://badgen.net/npm/license/magnostic)

magnostic is an opinionated bundler-agnostic lightweight CSS-in-JS utility using `css` paradigm.

- [Install](https://github.com/tommywalkie/magnostic#install)
- [Why another CSS-in-JS library ?](https://github.com/tommywalkie/magnostic#why-another-css-in-js-library-)
  - [Some issues with existing libraries](https://github.com/tommywalkie/magnostic#some-issues-with-existing-libraries)
- [Features](https://github.com/tommywalkie/magnostic#features)
- [API](https://github.com/tommywalkie/magnostic#api)
  - [`css(template,...props)`](https://github.com/tommywalkie/magnostic#csstemplateprops)
  - [`keyframes(template,...props)`](https://github.com/tommywalkie/magnostic#keyframestemplateprops)
  - [`extractCss()`](https://github.com/tommywalkie/magnostic#extractcss)
  - [`createStore()`](https://github.com/tommywalkie/magnostic#createstore)
- [Contributing](https://github.com/tommywalkie/magnostic#contributing)

### Install

```bash
npm install magnostic
```

### Why another CSS-in-JS library ?

I'm using [Emotion](https://github.com/emotion-js/emotion) on a daily basis in professional and hobby React, Svelte and Vue projects. 

CSS-in-JS is a great tool, and I enjoy using framework-agnostic `css` paradigm since it can be used in basically any framework. But once you start using _Server-Side Rendering_, it becomes a mess, especially if not using Babel or React.

#### Some issues with existing libraries

<sup>_<u>Notice</u>: Following mentionned snippets are subject to change._</sup>

- Emotion API is quite confusing [<sup>[1]</sup>](https://github.com/emotion-js/emotion/issues/1342) [<sup>[2]</sup>](https://github.com/emotion-js/emotion/issues/1635), there are currently two `css` paradigms (`emotion` [<sup>[3]</sup>](https://github.com/emotion-js/emotion/blob/c85378a204613885a356eaba1480c5151838c458/packages/create-emotion/src/index.js#L78-L82) and `@emotion/css` [<sup>[4]</sup>](https://github.com/emotion-js/emotion/blob/c85378a204613885a356eaba1480c5151838c458/packages/css/src/index.js#L6-L8)) which don't do the same thing. Emotion 11 is on the way [<sup>[5]</sup>](https://github.com/emotion-js/emotion/issues/1606) with lots of API reworks but I'll remain cautious
- [`linaria`](https://github.com/callstack/linaria) has Babel as a peer dependency [<sup>[6]</sup>](https://github.com/callstack/linaria/blob/e7f000123e24bd29974361223b901af4c958709c/package.json#L123-L125) and is mostly designed to be used with this tool [<sup>[7]</sup>](https://github.com/callstack/linaria/blob/e7f000123e24bd29974361223b901af4c958709c/src/core/css.ts#L8-L10)
- [`styled-components`](https://github.com/styled-components/styled-components) has React and React DOM as peer dependencies [<sup>[8]</sup>](https://github.com/styled-components/styled-components/blob/4d459d4a89f7e93a214697fe39cae5bbddf96308/packages/styled-components/package.json#L77-L81) and has a `css` paradigm which requires a Babel plugin
- [`monad-ui`](https://github.com/muhajirdev/monad-ui) has `@emotion/core`, React and React DOM as peer dependencies [<sup>[9]</sup>](https://github.com/muhajirdev/monad-ui/blob/c77a5597e01adc77aced18d276c3b1995183e40f/package.json#L28-L32)
- [`jss`](https://github.com/cssinjs/jss) [<sup>[10]</sup>](https://cssinjs.org/jss-syntax?v=v10.4.0) , [`aphrodite`](https://github.com/Khan/aphrodite) [<sup>[11]</sup>](https://github.com/Khan/aphrodite/blob/dc4269a9d66cd270b746d9a1fd58320e1e42b9be/typings/index.d.ts#L125) and many others don't support template literals
- [`goober`](https://github.com/cristianbote/goober) does have convenient `extractCss` method [<sup>[12]</sup>](https://github.com/cristianbote/goober#extractcsstarget) but its `css` paradigm lacks testing and features like _composition_ [<sup>[13]</sup>](https://emotion.sh/docs/composition) 
- [`picostyle`](https://github.com/morishitter/picostyle) only supports frameworks with JSX pragmas [<sup>[14]</sup>](https://github.com/morishitter/picostyle#usage)

### Features

- Similar Emotion API (nesting, composition, etc.)
- Bundler-agnostic
- Framework-agnostic
- Debugging
- Isolated stores
- Media queries (`@media`)
- Extract CSS
- Keyframes (`@keyframes`)

##### _To be implemented_

- Merge duplicate/overwritten styles
- Object styles
- Convert tagged templates ⬌ object styles

### API

#### `css(template,...props)`

- `@returns {MagnosticStyle}`  Style object with unique identifier

The default `css` method expects a tagged template literal as input, which may include variables or other magnostic styles passed via placeholders `${}`.

```jsx
import {css} from 'magnostic'
const style = css`
  color: blue;
`
console.log(`${style}`)  // 🠚 'css-ds3r7jufak'
console.log(style)
/**
 * 🠚 [Function: MagnosticStyle] : {
 *     type: 'style'
 *     className: 'css-ds3r7jufak',
 *     template: [ '\n  color: blue;\n' ],
 *     styles: '.css-ds3r7jufak{color:blue;}',
 *     toString: [Function]
 *  }
 */
```

Compared to Emotion, magnostic makes no assumption and still let users have control and visibility upon generated styles if explicitly asked to, using a regular `console.log` for example.

```js
// Using Emotion
import {css} from 'emotion'
const style = css`
  color: blue;
`
console.log(`${style}`)   // 🠚 'css-de54d5'
console.log(style)        // 🠚 'css-de54d5'
```

#### `keyframes(template,...props)`

`@returns {MagnosticKeyframes}`  Keyframes object with unique identifier

Similar to Emotion's `keyframes` method, the default `keyframes` method allows to explicitly register a CSS animation with an unique identifier, using a template literal as input.

```jsx
import {css, keyframes, extractCss} from 'magnostic'
const slideIn = keyframes`
  from {
    left: 100%;
  }

  to {
    left: 0%;
  }
`
console.log(`${slideIn}`)  // 🠚 'anim-yttaxx0b79'
```

Then, the animation can be used as a style rule.

```jsx
const slidingText = css`
  animation: ${slideIn} 1s ease infinite;
`
console.log(extractCss())
/**
 * 🠚 '@keyframes anim-yttaxx0b79{from{left:100%;}to{left:0%;}}
 *  .css-71cew5o9e7{animation: anim-yttaxx0b79 1s ease infinite;}'
 */
```

#### `extractCss()`

- `@returns {string}`  Returns the generated CSS code

Similar to `goober`'s `extractCss` method, this outputs generated CSS from all previous default `css` and `keyframes` method calls.

```jsx
import {css, extractCss} from 'magnostic'
const blueText = css`
  color: blue;
`
const cyanText = css`
  color: cyan;
`
console.log(extractCss())  
// 🠚 '.css-jutyrr209v{color:blue;}.css-l76dzjb8ke{color:cyan;}'
```

#### `createStore()`

- `@returns {MagnosticStore}`  Returns the generated store, including various methods

magnostic does provide a default `css` method which pushes any generated style to a global store, but still allows anyone to create their own **stores**, which all provide **isolated methods** (`css`, `extractCss`, `keyframes`, etc.). This is particularly useful when creating _view-specific_ style rules and/or when trying to reduce bundle sizes.

```jsx
import {createStore} from 'magnostic'

// Let's create a first store
const someStore = createStore()
const { css, extractCss } = someStore
const blueText = css`
  color: blue;
`
// Now let's create another store
const anotherStore = createStore()
const { css: css2, extractCss: extractCss2 } = anotherStore
const centerAlignedText = css2`
  text-align: center;
`

console.log(extractCss())   // 🠚 '.css-9lo91vqws3{color:blue;}'
console.log(extractCss2())  // 🠚 '.css-leg65ywf68{text-align:center;}'
```

### Contributing

magnostic is based on [`stylis`](https://github.com/thysultan/stylis.js) (like Emotion) and has a TypeScript codebase, there are some useful `npm` scripts :

- `npm run build` — Use [`tsup`](https://github.com/egoist/tsup) and [`esbuild`](https://github.com/evanw/esbuild) to bundle library and generate typings
- `npm run test` — Build then run tests with [`uvu`](https://github.com/lukeed/uvu)
- `npm run lint` — Run linting checks with [`xo`](https://github.com/xojs/xo) and fix common issues

