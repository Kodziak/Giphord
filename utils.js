exports.getFirstWord = function(str) {
    let spacePosition = str.indexOf(' ');
    if (spacePosition === -1)
        return str;
    else
        return str.substr(0, spacePosition);
}

exports.getStringExceptFirstWord = function(str) {
    return str.slice(5);
}

exports.replaceSpaceWithPlus = function(str) {
    return str.split(' ').join('+');
}