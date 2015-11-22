When comparing values, always use triple equals or similar comparisons.

```js
(true === true);
```

```js
(false !== true);
```

```js
(false != true);
```
```output
Line 12, column 8: Expected '!==' and instead saw '!='.
```

```js
(false == true);
```
```output
Line 19, column 8: Expected '===' and instead saw '=='.
```
