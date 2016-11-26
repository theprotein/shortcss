var list = require('./list');
var shorthandProps = require('css-shorthand-properties').shorthandProperties;

exports.isShorthand = isShorthand;
exports.expand = expand;
exports.isCompactable = isCompactable;
exports.compact = compact;

var invertedShorthandProps = Object.keys(shorthandProps)
    .reduce(function(inverted, shorthand) {
        expandAsArray(shorthand, false).forEach(function(key) {
            inverted[key] = shorthand;
        });
        return inverted;
    }, {})

var errors = {
    noPropertyArg: 'property argument is required',
    propsArentCompactable: 'properties aren\'t compactable'
}

/**
 * Expand a property to an array of parts or property and value to object
 *
 * @param {string} property
 * @param {?string} value
 * @param {?boolean} recurse
 * @returns {Array|Object}
 */
function expand(property, value, recurse) {
    if (!arguments.length) throw new Error(erros.noPropertyArg);

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
    if (longhand.length) return compactProperties(longhand)
}

/**
 * compactProperties — returns shorthand property from array of longhands.
 *
 * @param string[] props — longhand props
 * @returns string — shorthand property
 */
function compactProperties(props) {
    if (!isCompactable(props)) throw new Error(erros.propsArentCompactable);
    return invertedShorthandProps[props[0]];
}

function isShorthand(property) {
    if (shorthandProps.hasOwnProperty(property)) {
        return true;
    }
    return false;
}

/**
 * isCompactable — check if array of longhands could be compacted
 *
 * @param string[] longhands — longhand props
 * @returns Boolean
 */
function isCompactable(longhands) {
    return longhands.every(function(prop) {
        return invertedShorthandProps.hasOwnProperty(prop) &&
            invertedShorthandProps[prop] === invertedShorthandProps[longhands[0]];
    });
}
