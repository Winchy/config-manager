const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const validator = require("express-validator");
const path = require("path");

const config = require("./config");
const serverRouter = require("./server")
const middleware = require("./middleware")

const app = express();

let logType = "dev";
app.locals.ENV = config.env;
app.locals.ENV_DEVELOPMENT = (config.env === "development");
app.locals.rootPath = config.rootPath;

// Security
app.use(helmet());
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(validator());

app.use(compress());

app.use(express.static(path.join(__dirname, "public"), {
    maxage: app.locals.ENV_DEVELOPMENT? "0" : "30d"
}));
app.use("/dist", express.static(path.join(__dirname, "dist"), {
    maxage: app.locals.ENV_DEVELOPMENT? "0" : "30d"
}));


// server routers
app.use("/api", serverRouter);

// client router
app.get("/*", middleware.vueSSR, function(req, res) {
    res.renderVue && res.renderVue("index") || (!res.renderVue && res.end(""));
});

// Server routers

/**
 * Generic 404 handler
 * @param {object} req
 * @param {object} res
 */
function error404handler(req, res) {
    const data = {
        title: "Error 404",
    };
    req.vueOptions = {
        head: {
            title: "Error 404",
        },
    };
    res.statusCode = 404;
    res.renderVue && res.renderVue("error.vue", data, req.vueOptions) || (!res.renderVue && res.end("404"));
}
app.use(error404handler);

/**
 * Generic Error handling route
 * @param {object} error
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
function genericErrorHandler(error, req, res, next) {
    res.statusCode = 500;
    let data = {
        debug: config.env === "development",
        errorCode: error.code,
        error: error.stack,
    };
    if (res.statusCode) {
        res.renderVue && res.renderVue("error.vue", data) || (!res.renderVue && res.end(res.statusCode));
    } else {
        next();
    }
}
app.use(genericErrorHandler);


app.listen(config.port, () => {
    console.log(`Worker ${process.pid} running a ${config.env} server listening on port ${config.port}`);
});