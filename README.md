# Onelint

[standard-engine](https://github.com/Flet/standard-engine) based linter using the
[eslint-config-onelint](https://github.com/One-com/eslint-config-onelint)
configuration.

## Installation

Install the `onelint` package.

```
npm install --save-dev onelint
```

Set up a lint script in package.json:

```json
{
    "name": "some-package",
    "version": "1.0.0",
    "scripts": {
        "lint": "onelint"
    }
}
```

## Editor Configuration

### Atom

Use the
[linter-js-standard-engine](https://github.com/gustavnikolaj/linter-js-standard-engine)
plugin. It will automatically detect onelint and use it.

