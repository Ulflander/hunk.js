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

####

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

#### Common hunk starter using an anon module

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


# Core modules

Hunk embeds a few core modules that can be really useful to speed up JS apps 
development.

### Conf

```js
(function(self) {
    
    var conf = hunk.conf;

    self.start = function () {
        conf('key', 'value');
    };

    self.stop = function () {
        console.log(conf('key'));
        // "value"
    };

}(hunk(true)));

hunk();
hunk.end();
```





