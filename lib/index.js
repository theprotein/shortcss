var list = require('css-shorthand-properties').shorthandProperties;

exports.isShorthand = isShorthand;
exports.expand = expand;

function expand(property, recurse) {
    if (typeof recurse === 'undefined') {
        recurse = true;
    }

    if (!list.hasOwnProperty(property)) {
        return [property];
    }

    return list[property].map(function (p) {
        var longhand = p.substr(0, 1) === '-' ? property + p : p;
        return recurse ? expand(longhand, recurse) : longhand;
    }).reduce(function (res, cur) {
        return res.concat(cur);
    }, []);
}

function isShorthand(property) {
    if (list.hasOwnProperty(property)) {
        return true;
    }
    return false;
}
