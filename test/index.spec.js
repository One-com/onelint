var onelint = require('../');
var expect = require('unexpected')
    .clone()
    .addAssertion('to lint without errors', function (expect, subject) {
        return expect.promise(function (run) {
            onelint.lintText(subject, run(function (err, result) {
                if (err) {
                    return expect.fail(err);
                }
                // Add type for lint warning so they can be serialized nicely
                return expect(result.results, 'to satisfy', [
                    { errorCount: 0 }
                ]);
            }));
        });
    })
    .addAssertion('to lint with (errors|error)', function (expect, subject) {
        return expect.promise(function (resolve, reject) {
            onelint.lintText(subject, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });

describe('onelint', function () {
    describe('assertions', function () {
        it('to lint without errors', function () {
            return expect("var foo = 'bar';", 'to lint without errors');
        });
        it('to lint with (error|errors)', function () {
            return expect("var foo = 'bar'", 'to lint with error');
        });
    });
    it('should error on missing semicolons', function () {
        var code = "var foo = 'bar'";
        return expect(code, 'to lint with error').then(function (result) {
            return expect(result, 'to satisfy', {
                results: [
                    {
                        messages: [
                            {
                                message: 'Missing semicolon.'
                            }
                        ]
                    }
                ]
            })
        });
    });
});
