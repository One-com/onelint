Do not tolerate assignments inside if, for & while. Usually conditions & loops
are for comparison, not assignments.

```js
var foo = 'bar';
if (foo = 'baz') {
    foo = foo + 'qux';
}
```
```output
Line 6, column 5: Expected a conditional expression and instead saw an assignment.
```

This option suppresses warnings about the use of assignments in cases
where comparisons are expected. More often than not, code like `if (a =
10) {}` is a typo. However, it can be useful in cases like this one:

```js
var people = ['Bob', 'John'];
function call() {}
for (var i = 0, person; person = people[i]; i++) {
    call(person);
}
```

```output
Line 21, column 25: Expected a conditional expression and instead saw an assignment.
```

You can silence this error on a per-use basis by surrounding the assignment
with parenthesis, such as:

```js
var people = ['Bob', 'John'];
function call() {}
for (var i = 0, person; (person = people[i]); i++) {
    call(person);
}
```
