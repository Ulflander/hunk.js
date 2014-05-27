Hunk.js
=======

_Please note that this project is still a work in progress._

Micro-framework for JavaScript applications modularization, for Node.js and the browser.


Hunk is not a package manager. Hunk has been created to promote better JS
factorisation, and to help modularize little — and eventually big — applications.


- [Benefits](#benefits)
- [Install](#install)
- [Basics](#basics)
- [Static modules](doc/STATIC_MODULES.md)
- [Core modules](#core-modules)

# Benefits

- 
- Huge doc for less than 150 lines of codes

# Install

Soon available on npm and bower.


# Basics

## A first module

## Start and stop Hunk

Include the Hunk JS source, then just call `hunk()` that will start or stop
modules depending on current state.


```html
<script type="text/javascript" src="hunk.js"></script>
<script type="text/javascript">

    // Start hunk!
    hunk();

    // Then after a second
    setTimeout(function() {

        // Stop hunk
        hunk();

    }, 1000);
</script>
```

## Core modules

Hunk embeds a few core modules that can be really useful to speed up JS apps
development.

### Conf

`conf` core module is a tiny static module to manage a key/value pairs centralized
storage.

```js
(function(self) {
    'use strict';

    var conf = hunk.conf;

    self.start = function () {
        conf('key', 'Hello Hunk');
    };

    self.stop = function () {
        console.log(conf('key'));
        // "value"
    };

}(hunk(false)));

// Start, will set conf `key` > `Hello Hunk`
hunk();

// Stop
hunk();
// -> "Hello Hunk"
```

# Hunk API

### `hunk()`

Main hunk method has many use, depending on the kind of parameters we pass to it:

- `hunk()` - without parameter - Will start/stop hunk app
-



#### Get hunk running status

To know whether hunk is running or not, one may use `hunk.state` method.
```html
<script type="text/javascript" src="hunk-latest.js"></script>
<script type="text/javascript">

    // Is it running?
    console.log(hunk.state());
    // -> false

    // Start hunk!
    hunk();

    // Is it running?
    console.log(hunk.state());
    // -> true

    // Then after a second
    setTimeout(function() {

        // Stop hunk
        hunk();

        // Is it running?
        console.log(hunk.state());
        // -> false
    }, 1000);
</script>
```


#### Call a function when hunk starts

```js

// Add a start hook
hunk(function() {
    console.log('App just started!');
});


// ... later on, start hunk
hunk();
// -> "App just started!"

```
