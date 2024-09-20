
/////////////////////////////connect all graphql resolver files///////////////////////////////////
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeResolvers } = require('@graphql-tools/merge');
const resolverArray = loadFilesSync(path.join(__dirname, '.'), { extensions: ['resolver.js'] });
 module.exports = mergeResolvers(resolverArray);
