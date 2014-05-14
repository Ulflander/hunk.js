
(function() {
    'use strict';

    // Context
    var ctx = (function() {
            // Under node, context is exports
            if (typeof module !== 'undefined' && 
                typeof module.exports !== 'undefined') {
                return module.exports;
            } else {
                return window;
            }
        }()),
        // Did hunk started
        started = false,
        // Hunk start callbacks
        callbacks = [],
        // Hunk reference
        hunk;

    // Don't redeclare hunk
    if (typeof ctx.hunk === 'function') {
        return;
    }

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
     * 
     */
    hunk = function() {
        var args = Array.prototype.slice.call(arguments) || [],
            arg;

        // Start application
        if (args.length === 0) {
            if (started === false) {
                ctx.hunk.start();
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

            return;
        }

        // Two arguments
    };

    // Register itself
    ctx.hunk = hunk;
    modules['hunk'] = hunk;

    // Hunk methods
    (function(self) {

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

        /**
         * Register/get a module
         */
        self.module = function(name) {
            var args = Array.prototype.slice.call(arguments) || [];
            
        };

    }(ctx.hunk('hunk')));

    // Core modules
    (function(self) {

        var conf = {};

        /**
         * Set or get a configuration value.
         * 
         */
        return function(/* key, value */) {
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


