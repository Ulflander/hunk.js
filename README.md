Hunk.js
=======

_Please note that this project is still a work in progress._

Micro-framework for JavaScript applications modularization.

### Start and stop Hunk

Include the Hunk JS source, then just call `hunk()`.

```html
<script type="text/javascript" src="hunk-latest.js"></script>
<script type="text/javascript">
    // Start hunk!
    hunk();

    // Or using start method:
    hunk.start();

    setTimeout(function() {

        hunk.stop();

    }, 1000);
</script>
```
# Static modules

### Register static module

```js
(function(self) {
    
    var private = 'Hello hunk!';

    self.public = function () {
        return private;
    };

}(hunk('chunk')));
```

### Call a static module method

```js
(function(self) {
    
    var chunk = hunk.chunk;

    self.start = function () {
        return chunk.public();
    };

}(hunk('depends_on_chunk')));
```

### Anonymous static module

```js
(function(self) {
    
    self.start = function() {
        console.log('Im anon, so no module can call me.');
    };

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





