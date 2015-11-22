The linter will not complain about es6 module syntax.

Not when exporting stuff:

```js
export default function foo () {
    return 'foobar';
};
```

Nor when importing stuff:

```js
import foo from './foo';

foo();
```
