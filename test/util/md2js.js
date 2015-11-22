var fs = require('fs');
var path = require('path');

var codeBlockContentRegExp = /```(js|javascript|output)\n([^`]*)\n```/gm;

function findCodeBlocks (fileContent) {
    var match;
    var blocks = [];
    while ((match = codeBlockContentRegExp.exec(fileContent)) !== null) {
        var lineOffset = (fileContent.substr(0, match.index).match(/\n/g) || []).length;
        var result = {
            type: match[1],
            body: match[2],
            lineOffset: lineOffset + 1
        };

        if (result.type === 'output') {
            blocks[blocks.length - 1].output = result;
        } else {
            blocks.push(result);
        }
    }
    return blocks;
}

function createTestCase (codeBlock, index) {
    var l = [];
    l.push("it('case " + (index + 1) +  "', function () {");

    l.push('return expect(function (cb) {');
    l.push('onelint.lintText("' + codeBlock.body.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '", cb)');
    l.push("}, 'to call the callback without error').spread(function (output) {");

    l.push('var messages = output.results[0].messages;');
    l.push('messages=messages.map(function (msg) { return "Line " + (msg.line + ' + codeBlock.lineOffset + ') + ", column " + msg.column + ": " + msg.message; })');

    l.push('return expect(messages, "to equal", [');

    if (codeBlock.output) {
        codeBlock.output.body.split('\n').forEach(function (line) {
            l.push('"' + line.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '",');
        });
    }

    l.push(']);');
    l.push('});');
    l.push('});');
    return l;
}

function md2js (content, fileName) {
    if (fileName) {
        fileName = path.relative(process.cwd(), fileName);
    } else {
        fileName = '<inline code>';
    }

    var codeBlocks = findCodeBlocks(content);

    var codeLines = [];

    codeLines.push("var expect = require('unexpected').clone();");
    codeLines.push("var onelint = require('../');");
    codeLines.push("describe('" + fileName + "', function () {");
    codeLines = codeLines.concat(codeBlocks.map(createTestCase).reduce(function (list, item) {
        return list.concat(item);
    }, []));
    codeLines.push('});');

    return codeLines.join('\n');
}

require.extensions['.md'] = function (module, fileName) {
    module._compile(md2js(fs.readFileSync(fileName, 'utf-8'), fileName), fileName);
};
