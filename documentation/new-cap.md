Constructor functions must always be uppercase.

```js
function Foo() {}

new Foo();
```

Otherwise onelint will complain:

```js
function foo() {}
new foo();
```
```output
Line 13, column 5: A constructor name should not start with a lowercase letter.
```
