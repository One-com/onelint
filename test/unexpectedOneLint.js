var onelint = require('../');

function flattenLintReportMessages(lintReport) {
    var flattenedMessages = [];
    lintReport.results.forEach(function (result) {
        result.messages.forEach(function (message) {
            flattenedMessages.push(message);
        });
    });
    return flattenedMessages;
}

// Don't punish the first text for the upstart time of onelint
onelint.lintText(';', function () {});

module.exports = {
    name: 'unexpected-onelint',
    installInto: function (expect) {
        expect
            .addType({
                name: 'LintMessage',
                base: 'object',
                identify: function (value) {
                    return (
                        value && typeof value === 'object' &&
                        typeof value.ruleId === 'string' &&
                        typeof value.severity === 'number' &&
                        typeof value.line === 'number' &&
                        typeof value.column === 'number' &&
                        typeof value.message === 'string' &&
                        typeof value.source === 'string' &&
                        typeof value.fix === 'object'
                    );
                },
                inspect: function (message, depth, output, inspect) {
                    output
                        .text('Line ')
                        .append(inspect(message.line))
                        .text(', column ')
                        .append(inspect(message.column))
                        .text(': ')
                        .append(message.message)
                        .text(' (')
                        .append(message.ruleId)
                        .text(')');
                }
            })
            .addAssertion('<LintMessage> to violate rule <string>', function (expect, subject, value) {
                return expect(subject.ruleId, 'to satisfy', value);
            })
            .addAssertion('<LintMessage> to satisfy <string>', function (expect, subject, value) {
                return expect(subject.message, 'to satisfy', value);
            })
            .addAssertion('<LintMessage> to satisfy <regexp>', function (expect, subject, value) {
                return expect(subject.message, 'to satisfy', value);
            });

        expect
            .addType({
                name: 'LintReport',
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
                    output.text('LintReport(').nl()
                        .indentLines()
                        .i().text('errorCount: ')
                        .append(inspect(lintResult.errorCount))
                        .text(',').nl()
                        .i().text('warningCount: ')
                        .append(inspect(lintResult.warningCount))
                        .text(',').nl()
                        .i().text('messages: ')
                        .block(inspect(flattenLintReportMessages(lintResult), depth))
                        .nl().text(')');
                }
            })
            .addAssertion('<LintReport> to have an error count of <number>', function (expect, subject, value) {
                return expect(subject.errorCount, 'to equal', value);
            })
            .addAssertion('<LintReport> to have an error count greater than <number>', function (expect, subject, value) {
                return expect(subject.errorCount, 'to be greater than', value);
            })
            .addAssertion('<LintReport> to have messages satisfying <array>', function (expect, subject, value) {
                var flattenedMessages = flattenLintReportMessages(subject);
                return expect(flattenedMessages, 'to satisfy', value);
            })
            .addAssertion('<LintReport> to only have messages violating rule <string>', function (expect, subject, value) {
                var flattenedMessages = flattenLintReportMessages(subject);
                return expect(flattenedMessages, 'to have items satisfying', expect.it('to violate rule', value));
            })
            .addAssertion('<LintReport> to have violations [exhaustively] satisfying <any>', function (expect, subject, value) {
                var flattenedMessages = flattenLintReportMessages(subject);
                return expect(flattenedMessages, 'to [exhaustively] satisfy', value);
            })
            .addAssertion('<LintReport> to have message satisfying <string|regexp>', function (expect, subject, value) {
                var flattenedMessages = flattenLintReportMessages(subject);
                return expect(flattenedMessages, 'to satisfy', [value]);
            })
            .addAssertion('<LintReport> to have messages equal to <array>', function (expect, subject, value) {
                var flattenedMessages = flattenLintReportMessages(subject);
                return expect(flattenedMessages, 'to equal', value);
            });

        expect
            .addAssertion('<string> to lint without errors', function (expect, subject) {
                return expect.promise(function (run) {
                    onelint.lintText(subject, run(function (err, result) {
                        if (err) { return expect.fail(err); }
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
                        return result;
                    }));
                });
            });
    }
};
