/**
 * Here we create an anonymous module to initialize and start our application.
 */
(function(anon) {
    'use strict';

    // Optionally require some modules to be initialized
    var conf = hunk('conf');
    conf('key', 'value');

    // Start hunk
    hunk();

// Note that we pass false in order to create an anonymous module
}(hunk(false)));