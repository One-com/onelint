var onelint = require('../');

module.exports = {
    name: 'unexpected-onelint',
    installInto: function (expect) {
        expect
            .addType({
                name: 'LintResultMessages',
                base: 'array',
                identify: function (value) {
                    return Array.isArray(value) && value._isLintResultMessages && value.every(function (item) {
                        return (
                            item && typeof item === 'object' &&
                            typeof item.errorCount === 'number' &&
                            typeof item.warningCount === 'number' &&
                            Array.isArray(item.messages)
                        );
                    });
                },
                inspect: function (results, depth, output, inspect) {
                    var messages = [];
                    results.forEach(function (result) {
                        result.messages.forEach(function (message) {
                            // TODO Build messages in the following format:
                            // Line X: <message> (column Y)
                            messages.push(message.message);
                        });
                    });

                    output.text('LintResultMessages(')
                        .append(inspect(messages))
                        .text(')')
                }
            })
            .addAssertion('<LintResultMessages> to have messages satisfying <array>', function (expect, subject, value) {
                var messages = [];

                subject.forEach(function (result) {
                    result.messages.forEach(function (message) {
                        messages.push(message.message);
                    });
                })

                return expect(messages, 'to satisfy', value);
            })
            .addAssertion('<LintResultMessages> to have messages equal to <array>', function (expect, subject, value) {
                var messages = [];

                subject.forEach(function (result) {
                    result.messages.forEach(function (message) {
                        messages.push(message.message);
                    });
                })

                return expect(messages, 'to equal', value);
            });

        expect
            .addType({
                name: 'LintResult',
                base: 'object',
                identify: function (value) {
                    return (
                        value && typeof value === 'object' &&
                        typeof value.errorCount === 'number' &&
                        typeof value.warningCount === 'number' &&
                        Array.isArray(value.results)
                    );
                },
                inspect: function (lintResult, depth, output, inspect) {
                    output.text('LintResult(')
                        .text('errorCount: ')
                        .append(inspect(lintResult.errorCount))
                        .text(', ')
                        .text('warningCount: ')
                        .append(inspect(lintResult.errorCount))
                        .text(', ')
                        .append(inspect(lintResult.results, depth))
                        .text(')');
                }
            })
            .addAssertion('<LintResult> to have an error count of <number>', function (expect, subject, value) {
                return expect(subject.errorCount, 'to equal', value);
            })
            .addAssertion('<LintResult> to have an error count greater than <number>', function (expect, subject, value) {
                return expect(subject.errorCount, 'to be greater than', value);
            })
            .addAssertion('<LintResult> to have messages satisfying <array>', function (expect, subject, value) {
                return expect(subject.results, 'to have messages satisfying', value);
            })
            .addAssertion('<LintResult> to have messages equal to <array>', function (expect, subject, value) {
                return expect(subject.results, 'to have messages equal to', value);
            });

        expect
            .addAssertion('<string> to lint without errors', function (expect, subject) {
                return expect.promise(function (run) {
                    onelint.lintText(subject, run(function (err, result) {
                        if (err) { return expect.fail(err); }
                        result.results._isLintResultMessages = true
                        return expect(result, 'to have messages equal to', []);
                    }));
                });
            })
            .addAssertion('<string> to lint with (errors|error)', function (expect, subject) {
                return expect.promise(function (run) {
                    onelint.lintText(subject, run(function (err, result) {
                        if (err) {
                            throw err;
                        }
                        expect(result, 'to have an error count greater than', 0);
                        result.results._isLintResultMessages = true
                        return result;
                    }));
                });
            });
    }
};
