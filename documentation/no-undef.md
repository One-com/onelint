All non-global variables are required to be declared before they are used.

```js
function foo () {}
foo();
```

```js
foo = 'bar';
bar();
```
```output
Line 9, column 1: "foo" is not defined.
Line 10, column 1: "bar" is not defined.
```
