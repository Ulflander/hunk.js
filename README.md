Hunk.js
=======

Micro-framework for JavaScript applications modularization, for Node.js and the browser.

Hunk _is not_ a package manager. Hunk has been created to promote better JS
factorisation, and to help modularize little — and eventually big — web 
applications.

- [Benefits](#benefits)
- [Install](#install)
- [Basics](#basics)
- [Static modules](doc/STATIC_MODULES.md)
- [Core modules](#core-modules)

# Benefits

- Really tiny
- Promote better code factorisation
- Fun!
- Huge doc for less than 150 lines of codes

# Install

```sh
npm install --save hunk
```

Soon available on bower.

# Basics

## A first module

Let's create an hello world module!

```js
// Let's get started!
// First we create our module container, that is self called
// Here we see an `hello` parameter. We'll speak about it very soon. For now,
// you should only understand that this parameter is your module' public 
// methods container.
(function(hello){
   
    // So let's define our first method
    // We register it in our public container with the name `speak`
    hello.speak = function() {
        alert('Hello world!');
    };

// Here is the trick: that's where we pass our public container parameter, 
// generated by hunk. Hunk will kindly generate the container for us, and 
// pass it to our main function.
}(hunk('hello')));
```

Great! We have a module! Now how to call it? By calling `hunk('hello')` again:

```
var hello = hunk('hello');
hello.speak();
// -> Hello world!
```

Perfect! You did it!

For your information, the module you just created was a _static_ module - one
that can't be instanciated.

## Start and stop Hunk

Sometimes, particularly in the browser while the DOM is loading, but also in 
Node when stuff has to be initialized before the app can start, you need to 
defer the startup of your application at a time of your choice. If you need that,
then you can use Hunk start/stop signals.

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


# Work on the project

### Build hunk for the browser

For Node.js it is unnecessary to build hunk. However, you may want to lint it, check it with Google Closure Compiler, or for the browser you may want a minified version of hunk (the one in `dist/` folder).

Be happy, the default gulp task will cover everything:

```js
gulp
```