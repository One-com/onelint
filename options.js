var path = require('path');
var packageJson = require('./package.json');

module.exports = {
    cmd: 'onelint',
    version: packageJson.version,
    homepage: packageJson.homepage,
    bugs: packageJson.bugs.url,
    tagline: 'One JavaScript Style to Rule them All!',
    eslintConfig: {
        configFile: path.join(__dirname, 'eslintrc.json')
    }
    //formatter: require('onelint-format'),
    //formatterName: 'onelint-format'
};
