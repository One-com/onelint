Always wrap the function expression of an immediate function invocation in
parenthesis.

```js
(function () {})();
```

```js
(function(){}());
```
```output
Line 9, column 2: Wrap only the function expression in parens.
```
