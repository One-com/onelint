All non-global variables are required to be declared before they are used.

```js
var foo = 'bar';
```

```js
foo = 'bar';
bar();
```
```output
Line 8, column 1: "foo" is not defined.
Line 9, column 1: "bar" is not defined.
```
