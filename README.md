# antiglobal

Node/browser library to detect global/window namespace pollution.


## Installation

* With **npm**:

```bash
$ npm install antiglobal
```

* With **bower**:

```bash
$ bower install antiglobal
```

## Usage in Node

```javascript
var antiglobal = require('antiglobal');
```


## Browserified library

Take a browserified version of the library from the `dist/` folder:

* `dist/antiglobal-X.Y.Z.js`: The uncompressed version.
* `dist/antiglobal-X.Y.Z.min.js`: The compressed production-ready version.
* `dist/antiglobal.js`: A copy of the uncompressed version.

They all expose the global `window.antiglobal` function.

```html
<script src='antiglobal.js'></script>
```


## Usage Example

```javascript
<script src='js/antiglobal.js'></script>

<script src='js/foo.js'></script>  // Creates window.FOO.

<script>
    antiglobal('FOO');  // OK, returns true.
</script>

<script src='js/bar.js'></script>  // Creates window.BAR.

<script>
    antiglobal('QWE');  // ERROR: given globals do not match real new globals [given: QWE | real: BAR]
</script>
```


## Documentation

#### `antiglobal(name1, name2, ...)` function

* `nameN`: The name (string) of a new expected element in the global/window namespace.

Returns `true` if given arguments match the new elements in the global/window namespace.
It updates the list of elements in the global/window namespace for the next execution.


#### `antiglobal.log` read/write property

If set to `true`, errors when calling `antiglobal()` are logged to `console.error`.
Default value is `true`.


#### `antiglobal.throw` read/write property

If set to `true`, errors when calling `antiglobal()` throw an `Error` exception.
Default value is `false`.


## Author

Iñaki Baz Castillo.


## License

ISC.

