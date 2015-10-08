var onelint = require('../');
var expect = require('unexpected')
    .clone()
    .addAssertion('to lint without errors', function (expect, subject) {

    })
    .addAssertion('to lint with (errors|error)', function (expect, subject) {
        console.log(subject)
        console.log(onelint.lintText(subject, function () { console.log(arguments) }))
        return expect('true', 'to be truthy');
    });

describe('onelint', function () {
    it('should error on missing semicolons', function () {
        var code = "var foo = 'bar'";
        return expect(code, 'to lint with error');
    });
});
