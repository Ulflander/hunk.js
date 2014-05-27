
# Static modules

## Register static module

Let's declare a simple `chunk` module that logs a message in console when hunk starts.

```js
(function(self) {
    'use strict';

    // A private member
    var priv = 'Hello hunk!';

    // A public member
    self.pub = function () {
        return priv;
    };

}(hunk('chunk')));
```

## Call a static module method

Now that we declared our `chunk` module with its `pub` method, let's create
another module that will call that method.

```js
(function(self) {

    var chunk = hunk('chunk');

    self.start = function () {
        return chunk.pub();
    };

}(hunk('depends_on_chunk')));
```

## Anonymous static module

By registering a module without giving a name, it will create an anonymous
module. Anon modules can't be required from other modules, and therefore are
entirely protected from external calls.

```js
// By convention, anonymous modules take `anon` parameter rather than `self`.
// It let developers identify anon modules directly from the head of the code.
(function(anon) {

    // Anonymous modules can contain hooks called from
    // hunk start/stop process.
    anon.start = function() {
        console.log('Im anon, so no module can call me.');
    };

// Call hunk and pass `false` to declare the module as anon
}(hunk(false)));
```

## Static module with main method

It is possible to setup a module so calling its name as a function will call
a main method.

```js
// A module with a "main method"
(function(self) {
    'use strict';

    // Redefine self with a function
    self = hunk('main_module', function() {
        console.log("Main method called");
    });

}(hunk('main_module')));

// Then in another module
(function(self) {

    // Require our main_module
    var main_module = hunk('main_module');

    // And call it directly!
    main_module();
    // -> "Main method called"

}(hunk(false)));
```
