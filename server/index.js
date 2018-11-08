const express = require("express");
const glob = require("glob");
const config = require("../config")

const router = express.Router();

// init routers
let routerInitializers = glob.sync(config.root + "/server/routers/**/*.js");
routerInitializers.forEach( initializer => {
    module.require(initializer)(router);
});

// todo: init database connection

module.exports = router;