
function seperator (content) {
    var sep = 'z' + (new Date()).getTime();

    return content.indexOf(sep) === -1 ? sep : seperator(content);
}

exports.seperator = seperator;