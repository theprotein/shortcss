var ASSERT = require('assert');
var list = require('./list');
var props = require('css-shorthand-properties').shorthandProperties;

exports.isShorthand = isShorthand;
exports.expand = expand;

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
    if (!props.hasOwnProperty(property)) {
        return [property];
    }

    return props[property]
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
    if (!props.hasOwnProperty(property)) {
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

function isShorthand(property) {
    if (props.hasOwnProperty(property)) {
        return true;
    }
    return false;
}
