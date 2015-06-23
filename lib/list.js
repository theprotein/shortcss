var SPACES = [' ', '\n', '\t'];
var COMMAS = [','];

var list = module.exports = {

    split: function(string, separators, last) {
        var array   = [];
        var current = '';
        var split   = false;

        var func    = 0;
        var quote   = false;
        var escape  = false;

        for ( var i = 0; i < string.length; i++ ) {
            var letter = string[i];

            if ( quote ) {
                if ( escape ) {
                    escape = false;
                } else if ( letter === '\\' ) {
                    escape = true;
                } else if ( letter === quote ) {
                    quote = false;
                }
            } else if ( letter === '"' || letter === "'" ) {
                quote = letter;
            } else if ( letter === '(' ) {
                func += 1;
            } else if ( letter === ')' ) {
                if ( func > 0 ) func -= 1;
            } else if ( func === 0 ) {
                if ( separators.indexOf(letter) !== -1 ) split = true;
            }

            if ( split ) {
                if ( current !== '' ) array.push(current.trim());
                current = '';
                split   = false;
            } else {
                current += letter;
            }
        }

        if ( last || current !== '' ) array.push(current.trim());
        return array;
    },

    space: function(string) {
        return list.split(string, SPACES);
    },

    comma: function(string) {
        return list.split(string, COMMAS, true);
    }

};
