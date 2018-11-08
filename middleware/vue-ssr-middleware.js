const fs = require("fs");
const path = require("path");
const bundle = require("../dist/server.bundle.js");
const renderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync("./client/index.html", "utf-8")
});

module.exports = function(req, res, next) {

    res.renderVue = function(vuePath) {
        bundle.default({url: req.url}).then( app => {
            const context = {
                title: "CMP",
                meta: `<meta description="Configuration Management Platform">`
            };
            renderer.renderToString(app, context, (err, html) => {
                if (err) {
                    if (err.code == 404) {
                      res.status(404).end('Page not fount');
                    } else {
                      res.status(500).end('Internal Server Error');
                    }
                } else {
                    res.set('Content-Type', 'text/html');
                    res.end(html);
                }
            });
        }, err => {
            if (err.code == 404) {
                res.status(404).end('Page not fount -- vue-router');
            } else {
                res.status(500).end('Internal Server Error -- vue-router');
            }
        });
    }
    next();
}