Onelint requires you to use semicolons.

```js
var foo = 'bar';
foo += 'bar';
```

Omitting them will result in an error.

```js
var foo = 'bar';
foo += 'foo'
```

```output
Line 12, column 13: Missing semicolon.
```
