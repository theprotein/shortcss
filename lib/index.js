var ASSERT = require('assert');
var list = require('./list');
var shorthandProps = require('css-shorthand-properties').shorthandProperties;

var invertedShorthandProps = Object.keys(shorthandProps)
    .reduce(function(inverted, shorthand) {
        expandAsArray(shorthand, false).forEach(function(key) {
            inverted[key] = shorthand;
        });
        return inverted;
    }, {})

exports.isShorthand = isShorthand;
exports.expand = expand;
exports.compact = compact;

/**
 * Expand a property to an array of parts or property and value to object
 *
 * @param {string} property
 * @param {?string} value
 * @param {?boolean} recurse
 * @returns {Array|Object}
 */
function expand(property, value, recurse) {
    ASSERT(arguments.length, 'property argument is required');

    if (arguments.length < 3) {
        if (typeof value === 'boolean') {
            recurse = value;
            value = undefined;
        } else {
            recurse = true;
        }
    }

    var undefvalue = typeof value === 'undefined';

    return undefvalue?
        expandAsArray(property, recurse)
        : expandAsObject(property, value, recurse);
}

function expandAsArray(property, recurse) {
    if (!shorthandProps.hasOwnProperty(property)) {
        return [property];
    }

    return shorthandProps[property]
        .map(function (p) {
            var longhand = p.substr(0, 1) === '-' ? property + p : p;
            return recurse ? expand(longhand, recurse) : longhand;
        })
        .reduce(function (res, cur) {
            return res.concat(cur);
        }, []);
}

/**
 * expandAsObject
 *
 * @param {string} property - Source property name
 * @param {string|string[]} value - Source property value
 * @param {boolean} recurse - Flag to expand recursively
 * @return {Object} - Resulting object
 */
function expandAsObject(property, value, recurse) {
    var res = {};
    if (!shorthandProps.hasOwnProperty(property)) {
        res[property] = value;
        return res;
    }

    var subs = expandAsArray(property, false);
    if (typeof value === 'string') {
        value = list.space(value);
    }

    for (var i = 0, j, l = subs.length, jl = value.length; i < l; i++) {
        j = i < jl ? i : (jl < 2 ? 0 : i % 2);

        if (recurse) {
            var recRes = expandAsObject(subs[i], value[j], recurse);
            var keys = Object.keys(recRes);
            for (var ri = 0, rl = keys.length; ri < rl; ri++) {
                res[keys[ri]] = recRes[keys[ri]];
            }
        } else {
            res[subs[i]] = value[j];
        }
    }

    return res;
}

function compact(longhand) {
    if (longhand.length) return compactFromArray(longhand)
}

function compactFromArray(props) {
    ASSERT(areCompactable(props), 'properties aren\'t compactable');
    return invertedShorthandProps[props[0]];
}

function isShorthand(property) {
    if (shorthandProps.hasOwnProperty(property)) {
        return true;
    }
    return false;
}

function areCompactable(longhand) {
    return longhand.every(function(prop) {
        return invertedShorthandProps.hasOwnProperty(prop) &&
            invertedShorthandProps[prop] === invertedShorthandProps[longhand[0]];
    });
}
