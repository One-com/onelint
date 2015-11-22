You should avoid using `arguments.caller` and `arguments.callee`.

```js
function foo() {
    var calleer = arguments.callee;
    calleer += arguments.caller;
}
foo();
```
```output
Line 5, column 19: Avoid arguments.callee.
Line 6, column 16: Avoid arguments.caller.
```
