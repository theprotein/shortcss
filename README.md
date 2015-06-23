# shortcss

CSS Shorthand expander/combiner.

A simple way to check [shorthand](http://www.w3.org/TR/CSS2/about.html#shorthand) CSS properties, which properties they expand to, combine several properties into shorthand, etc.

Atm this one uses very handy module with CSS shorthand list [css-shorthand-properties](https://github.com/gilmoreorless/css-shorthand-properties).

## Installation

Available on npm as `shortcss`.

```
npm install shortcss
```

## Usage

### API

#### _boolean_ isShorthand (_string_ property)

* Checks a string to be an expandable shorthand for several CSS properties
* **Parameters**:
    * `property` _(string)_ CSS property to check.
* **Returns**: _boolean_ whether or not the passed property is a shorthand.

#### _Array|Object_ expand (_string_ property, [_string_ value], [_boolean_ recurse])

* Takes a CSS shorthand property and returns a list of longhand properties
* **Parameters**:
	* `property` _(string)_ Shorthand property to expand.
	* `value` _(string)_ Split also a value to expanded properties. In that way the function will return an object.
	* `recurse` _(boolean – optional, default `false`)_ If true, each longhand property will also be run through `expand()`. This is only useful for the `border` property.
* **Returns**: _Array|Object_ with a list of longhand properties that the given property expands to. If the property is not a shorthand, the array contains only the original property.

### Examples

```js
var SC = require('shortcss');

// Standard usage
SC.expand('list-style');
// ['list-style-type', 'list-style-position', 'list-style-image']

// Non-shorthand properties return themselves in an array
SC.expand('color');
// ['color']

// Using 'border' in normal mode...
SC.expand('border');
/*
[
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'
]
*/

// ...the border properties are also shorthands
SC.expand('border-width');
// ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width']

// Using 'border' without recursion returns
SC.expand('border', false);
// ['border-width', 'border-style', 'border-color']

// Expanding border with a value
SC.expand('border', '1px solid red');
/*
{
  'border-top-width': '1px',
  'border-right-width': '1px',
  'border-bottom-width': '1px',
  'border-left-width': '1px',
  'border-top-style': 'solid',
  'border-right-style': 'solid',
  'border-bottom-style': 'solid',
  'border-left-style': 'solid',
  'border-top-color': 'red',
  'border-right-color': 'red',
  'border-bottom-color': 'red',
  'border-left-color': 'red'
}
*/

// ... and the same with recurse flag set to false
SC.expand('border', '1px solid red', false);
/*
{
  'border-width': '1px',
  'border-style': 'solid',
  'border-color': 'red'
}
*/
```


## Licence

MIT: [License](https://github.com/theprotein/shortcss/blob/master/LICENSE)
