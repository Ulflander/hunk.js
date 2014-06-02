

var ctx = (function() {
    'use strict';
    // Under node, context is exports
    if (typeof module !== 'undefined' &&
        typeof module.exports !== 'undefined') {
        return module.exports;
    } else {
        return window;
    }
}());

(function() {
    'use strict';

        // Hunk reference
    var hunk;

    // Don't redeclare hunk
    if (typeof ctx.hunk === 'function') {
        return;
    }



    // Hunk core is a module in itself
    hunk = (function(self) {

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
         * Called with two params, first being a string and second being a
         * function, it will bind the function as main module container.
         *
         */
        self.main = function() {
            var args = Array.prototype.slice.call(arguments) || [],
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
                        modules[arg] = function(){};
                        self[arg] = modules[arg];
                    }

                    return modules[arg];
                }

                // Register anonymous module
                if (typeof arg === 'boolean' && arg === false) {
                    m = function() {};
                    anon.push(m);
                    return m;
                }

                return;
            }

            // Two arguments
            if (args.length === 2) {
                arg = args.shift();

                if (typeof arg === 'string' && arg !== 'hunk' &&
                        (typeof args[0] === 'function' || 
                        typeof args[0] === 'object')) {

                    // If module already exists, rebind all declared members
                    // to the new holder
                    if (!!modules[arg]) {
                        for (m in modules[arg]) {
                            if (modules[arg].hasOwnProperty(k)) {
                                args[0][k] = modules[arg][k];
                            }
                        }
                    }

                    // Rebind to hunk
                    self[arg] = args[0];
                    modules[arg] = args[0];
                }

                return args[0];
            }

        };

        // Here is the magic: use hunk main to declare hunk main, so calling
        // `hunk` will call hunk.main. Ha ha.
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
            if (started === true) {
                return;
            }

            var i,
                l = callbacks.length;

            started = true;

            for(i = 0; i < l; i += 1) {
                callbacks[i](self);
            }
            callbacks = [];

            return self.trigger('start');
        };

        /**
         * Stop hunk.
         */
        self.stop = function() {
            if (started === false) {
                return;
            }
            started = false;
            return self.trigger('stop');
        };

        /**
         * Trigger a method on all modules.
         *
         * @param  {String} method Method name to call on modules
         * @return {hunk}          Hunk reference for chained commands
         */
        self.trigger = function(method) {
            for (var k in modules) {
                if (modules.hasOwnProperty(k) &&
                    typeof modules[k][method] === 'function') {
                    modules[k][method]();
                }
            }

            return self;
        };

        return self;

    }({}));


    // Register itself
    ctx.hunk = hunk;


}());



/**
 * Configuration core module.
 */
(function() {
    'use strict';


    // Conf store
    var conf = {},

        /**
         * Set or get a configuration value.
         *
         */
        self = ctx.hunk('conf', function(/* key, value */) {
            var args = Array.prototype.slice.call(arguments) || [],
                k;

            if (args.length === 0) {
                return conf;
            }

            if (args.length === 2) {
                conf[args[0]] = args[1];
            } else if (args.length === 1 && typeof args[0] === 'object') {
                for (k in args[0]) {
                    if (args[0].hasOwnProperty(k)) {
                        conf[k] = args[0][k];
                    }
                }

                if (!!k) {
                    return conf[k];
                }
            }

            return conf[args[0]];
        });
}());

