
(function() {
    'use strict';

    // Hunk context
    var ctx = (function() {
            // Under node, context is exports
            if (typeof module !== 'undefined' && 
                typeof module.exports !== 'undefined') {
                return module.exports;
            } else {
                return window;
            }
        }()),

        // Hunk reference
        hunk;

    // Don't redeclare hunk
    if (typeof ctx.hunk === 'function') {
        return;
    }



    // Hunk core is a module in itself
    var hunk = (function(self) {

        // Identified modules
        var modules = {},
        
        // Anonymous modules
            anon = [],

        // Did hunk started
            started = false,

        // Hunk start callbacks
            callbacks = [];


        /**
         * Hunk main method.
         *
         * Called without argument, it will start hunk.
         *
         * Called with one Function param, it will register the function and call it
         * when hunk is started.
         *
         * Called with one String param, it will return the so-called module (or an
         * empy object to be populated for a new module).
         *
         * Called with one Boolean param `false`, it will return an anonymous 
         * module.
         * 
         */
        self.main = function() {
            var args = Array.prototype.slice.call(arguments) || [],
                m,
                arg;

            // Start application
            if (args.length === 0) {
                if (started === false) {
                    ctx.hunk.start();
                } else {
                    ctx.hunk.stop();
                }
                return;
            }

            // One argument: can be a callback
            // or to get/register a module
            if (args.length === 1) {
                arg = args.shift();

                // Start callback
                if (typeof arg === 'function') {
                    if (started === true) {
                        arg(ctx.hunk);
                    } else {
                        callbacks.push(arg);
                    }
                    return;
                }

                // Register/get module
                if (typeof arg === 'string') {
                    if (!modules[arg]) {
                        modules[arg] = function() {};
                    }

                    return modules[arg];
                }

                // Register/get anonymous module
                if (typeof arg === 'boolean' && arg === false) {
                    m = function() {};
                    anon.push(m);
                    return m;
                }

                return;
            }

            // Two arguments
            if (args.length === 2) {

                if (typeof arg === 'string' && arg !== 'hunk') {
                    modules[arg] = args[1];
                }
                return args[1];
            }

        };

        // Here is the magic: use hunk main to declare hunk main, so calling
        // `hunk` will call hunk.main
        self = self.main('hunk', self.main);

        /**
         * Return true if hunk is running, false otherwise
         * 
         * @return {Boolean} Hunk running state
         */
        self.state = function() {
            return started;
        };

        /**
         * Start hunk.
         */
        self.start = function() {
            var i,
                k,
                l = callbacks.length;

            for(i = 0; i < l; i += 1) {
                callbacks[i](self);
            }

            for (k in modules) {
                if (modules.hasOwnProperty(k) && 
                    typeof modules[k].start === 'function') {
                    modules[k].start();
                }
            }

            started = true;
        };




    }({});


    // Register itself
    ctx.hunk = hunk;

    /**
     * Configuration core module.
     */
    (function(self) {

        // Conf store
        var conf = {};

        /**
         * Set or get a configuration value.
         * 
         */
        self = hunk('conf', function(/* key, value */) {
            var args = Array.prototype.slice.call(arguments) || [];
            if (args.length === 0) {
                return conf;
            }

            if (args.length === 2) {
                conf[arg[0]] = arg[1];
            }

            return conf[arg[0]];
        };

    }(hunk('conf')));

}());


