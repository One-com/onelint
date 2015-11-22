You should always use single quotes.

```js
var foo = 'this is a single quoted string';
```

Unless you can avoid escaping by using double quotes.

```js
var foo = "this didn't require escaping because of the double quotes!";
```

```js
var foo = "bar";
```
```output
Line 14, column 11: Strings must use singlequote.
```
