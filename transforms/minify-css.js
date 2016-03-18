var cssmin = require('cssmin'),
    util    = require('../util');

module.exports = function (parts) {
    var sep = util.seperator(parts.join(''));

    return cssmin(parts.join(sep)).split(sep);
};