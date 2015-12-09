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

Do not complain when functions with an uppercase letter as the first letter are
called without the new operator.

```js
function ImNoConstructorFunction() {}

ImNoConstructorFunction();
```
