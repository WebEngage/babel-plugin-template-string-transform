var minify = require('html-minifier').minify,
    util    = require('../util');

module.exports = function (parts) {
    var sep = util.seperator(parts.join(''));

    var options = {
        removeComments               : true,
        removeCommentsFromCDATA      : true,
        removeCDATASectionsFromCDATA : true,
        collapseWhitespace           : true,
        conservativeCollapse         : false,
        collapseInlineTagWhitespace  : true,
        preserveLineBreaks           : false,
        collapseBooleanAttributes    : true,
        removeTagWhitespace          : true,
        removeAttributeQuotes        : true,
        removeRedundantAttributes    : true,
        preventAttributesEscaping    : false,
        keepClosingSlash             : true,
        quoteCharacter               : '"'
    };

    return minify(parts.join(sep), options).split(sep);
}