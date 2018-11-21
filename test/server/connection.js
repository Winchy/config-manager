const test = require("ava")
const mongodb = require('../../server/connection')

test.cb("connection", t => {
    t.is({a: 1, b: 2}, {a: 3, b: 4});
    t.end();
})