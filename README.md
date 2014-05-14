Hunk.js
=======

_Please note that this project is still a work in progress._

Micro-framework for JavaScript applications modularization, for Node.js and the browser.

### Start and stop Hunk

Include the Hunk JS source, then just call `hunk()` that will start or stop 
modules depending on current state.

```html
<script type="text/javascript" src="hunk-latest.js"></script>
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


# Static modules

### Register static module

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

### Call a static module method

```js
(function(self) {
    
    var chunk = hunk('chunk');

    self.start = function () {
        return chunk.public();
    };

}(hunk('depends_on_chunk')));
```

### Module with `main` method

It is possible to declare a module with 


### Anonymous static module

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

### Static module with main method

It is possible to setup a module so calling it's name as a function will call
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


# Core modules

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

// Stop, will log `Hello Hunk` in console
hunk();
```

# Common use cases

#### Application starter using an anonymous module

Here we create an anonymous module to initialize and start our application.

```js
(function(anon) {
    'use strict';

    // Require some modules to be initialized
    var conf = hunk('conf');

    // Initialize whatever needs to be initialized
    conf('key', 'value');

    // Start hunk
    hunk();

}(hunk(false)));
```

#### Get hunk running status

To know whether hunk is running or not, one may use `hunk.state` method.
```js
<script type="text/javascript" src="hunk-latest.js"></script>
<script type="text/javascript">
    
    // Is it running?
    console.log(hunk.state());
    // false

    // Start hunk!
    hunk();

    // Is it running?
    console.log(hunk.state());
    // true

    // Then after a second
    setTimeout(function() {

        // Stop hunk
        hunk();

        // Is it running?
        console.log(hunk.state());
        // false
    }, 1000);
</script>
```


#### Call a function when hunk starts

```js
(function() {
    'use strict';
    
    // Add a start hook
    hunk(function() {
        console.log('App just started!')
    });

}());

// ... later on, start hunk
hunk();
// will log `App just started!`.

```
