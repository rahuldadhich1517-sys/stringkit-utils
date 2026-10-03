# StringKit

[![npm version](https://img.shields.io/npm/v/stringkit-utils.svg)](https://www.npmjs.com/package/stringkit-utils)
[![npm downloads](https://img.shields.io/npm/dm/stringkit-utils.svg)](https://www.npmjs.com/package/stringkit-utils)
[![Runtime dependencies](https://img.shields.io/badge/runtime%20dependencies-0-brightgreen)](https://www.npmjs.com/package/stringkit-utils)
[![Modules](https://img.shields.io/badge/modules-ESM%20%2B%20CommonJS-blue)](https://www.npmjs.com/package/stringkit-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-first-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/npm/l/stringkit-utils.svg)](https://github.com/rahuldadhich1517-sys/stringkit/blob/main/LICENSE)

StringKit is a small, dependency-free TypeScript library for common string and text operations.

## Features

- Convert text between camel, Pascal, snake, and kebab case
- Create URL-friendly slugs with configurable separators and normalization
- Truncate text, optionally preserving word boundaries
- Generate random strings using the Web Crypto API
- Count words, Unicode code points, and lines
- Mask text while leaving selected characters visible
- ESM and CommonJS entry points with included TypeScript declarations

## Installation

```bash
npm install stringkit-utils
```

## Quick start

```js
import { camelCase, slugify, truncate } from "stringkit-utils";

console.log(camelCase("Hello, StringKit")); // "helloStringKit"
console.log(slugify("Café au lait")); // "cafe-au-lait"
console.log(truncate("A longer piece of text", 12)); // "A longer..."
```

## API

All utilities are named exports from `stringkit-utils`.

| Export | Description |
| --- | --- |
| `camelCase(value)` | Convert text to `camelCase`. |
| `pascalCase(value)` | Convert text to `PascalCase`. |
| `snakeCase(value)` | Convert text to `snake_case`. |
| `kebabCase(value)` | Convert text to `kebab-case`. |
| `slugify(text, options?)` | Normalize text into a slug. |
| `truncate(text, maxLength, options?)` | Limit text to a maximum length. |
| `randomString(length, options?)` | Generate a random string. |
| `countWords(text)` | Count whitespace-separated words. |
| `countCharacters(text)` | Count Unicode code points. |
| `countLines(text)` | Count lines separated by `\n`, `\r\n`, or `\r`. |
| `mask(text, options?)` | Replace part of a string with a mask character. |

### Case conversion

```ts
camelCase(value: string): string
pascalCase(value: string): string
snakeCase(value: string): string
kebabCase(value: string): string
```

These functions split text at spaces, underscores, hyphens, punctuation, and lower-to-upper or acronym-to-word boundaries, then normalize the words to the requested case. Empty or separator-only input returns an empty string.

```ts
camelCase("XMLHttpRequest"); // "xmlHttpRequest"
pascalCase("hello world");   // "HelloWorld"
snakeCase("Hello World");    // "hello_world"
kebabCase("hello_world");    // "hello-world"
```

### `slugify`

```ts
slugify(text: string, options?: SlugifyOptions): string
```

Normalizes text with NFKD, removes combining marks, converts whitespace to the separator, and (by default) removes characters other than Unicode letters, numbers, and the separator.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `separator` | `string` | `"-"` | Separator inserted for whitespace and repeated between tokens. Must not be empty. |
| `lowercase` | `boolean` | `true` | Convert the result to lowercase. |
| `strict` | `boolean` | `true` | Remove characters other than letters, numbers, and the separator. |
| `trim` | `boolean` | `true` | Remove leading and trailing separators. |

```ts
slugify("Café au lait"); // "cafe-au-lait"
slugify("Hello World", { separator: "_", lowercase: false }); // "Hello_World"
```

`text` must be a string; otherwise a `TypeError` is thrown. An empty separator throws an `Error`.

### `truncate`

```ts
truncate(text: string, maxLength: number, options?: TruncateOptions): string
```

Returns the original text when it fits within `maxLength`. Otherwise, appends a suffix within the maximum length and, by default, avoids ending in the middle of a word when a preceding space is available. Length is measured in JavaScript string code units.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `suffix` | `string` | `"..."` | Text appended when truncation occurs. |
| `preserveWords` | `boolean` | `true` | Prefer a word boundary when truncating. |

```ts
truncate("This is a very long sentence", 20); // "This is a very..."
truncate("Hello wonderful world", 15, { preserveWords: false }); // "Hello wonder..."
```

`maxLength` must be a non-negative integer or a `RangeError` is thrown. A maximum of `0` returns an empty string. If the suffix is as long as or longer than the maximum, the suffix itself is sliced to fit.

### `randomString`

```ts
randomString(length: number, options?: RandomStringOptions): string
```

Generates a string by selecting characters from the enabled character sets using `globalThis.crypto.getRandomValues`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `lowercase` | `boolean` | `true` | Include `a-z`. |
| `uppercase` | `boolean` | `true` | Include `A-Z`. |
| `numbers` | `boolean` | `true` | Include `0-9`. |
| `symbols` | `boolean` | `false` | Include `!@#$%^&*()-_=+[]{};:,.<>?`. |
| `customCharacters` | `string` | — | Use this character set instead of the enabled sets. Must not be empty. |

```ts
randomString(12);
randomString(16, { lowercase: false, symbols: true });
randomString(8, { customCharacters: "ABC123" });
```

`length` must be a non-negative integer or a `RangeError` is thrown. A length of `0` returns an empty string. For positive lengths, an empty character pool throws an `Error`; the function also throws if Web Crypto is unavailable in the environment.

### Text counters

```ts
countWords(text: string): number
countCharacters(text: string): number
countLines(text: string): number
```

- `countWords` counts non-empty groups separated by whitespace; empty or whitespace-only input returns `0`.
- `countCharacters` counts Unicode code points with `Array.from`, rather than UTF-16 code units. It does not count grapheme clusters, so a visually combined emoji or accented character may count as multiple code points.
- `countLines` recognizes Unix (`\n`), Windows (`\r\n`), and old Mac (`\r`) line endings. Empty input returns `0`; a trailing line break contributes an additional empty line.

```ts
countWords("Hello world"); // 2
countLines("First\r\nSecond"); // 2
```

Each counter expects a string and throws a `TypeError` for other values.

### `mask`

```ts
mask(text: string, options?: MaskOptions): string
```

Masks text while keeping a selected number of characters visible. Character positions and counts are based on Unicode code points.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `visible` | `number` | `4` | Number of characters to leave visible. |
| `position` | `"start" \| "end" \| "both"` | `"end"` | Keep characters visible at the start, end, or both ends. With `"both"`, this many characters are kept at each end. |
| `maskCharacter` | `string` | `"*"` | Character or string used for masking. Must not be empty. |

```ts
mask("9876543210"); // "******3210"
mask("9876543210", { visible: 2, position: "both" }); // "98******10"
```

If the requested visible characters cover the entire input, the input is returned unchanged. `visible` must be a non-negative integer; invalid values throw a `RangeError`. Invalid positions or an empty mask character throw an `Error`.

## JavaScript and TypeScript

StringKit can be used from JavaScript or TypeScript. TypeScript declaration files are included in the package.

ES modules:

```js
import { slugify, mask } from "stringkit-utils";
```

CommonJS:

```js
const { slugify, mask } = require("stringkit-utils");
```

The public option types are `SlugifyOptions`, `TruncateOptions`, `RandomStringOptions`, and `MaskOptions`.

## Compatibility

The package publishes ESM and CommonJS entry points and TypeScript declarations. `randomString` requires an environment that provides `globalThis.crypto.getRandomValues`. The package does not declare a Node.js engine range or browser support target.
