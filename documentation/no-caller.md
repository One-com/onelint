You should avoid using `arguments.caller` and `arguments.callee`.

```js
function foo() {
    var callee = arguments.callee;
    var caller = arguments.caller;
}
```
```output
Line 5, column 18: Avoid arguments.callee.
Line 6, column 18: Avoid arguments.caller.
```
