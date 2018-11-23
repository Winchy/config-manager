const test = require('ava');
const rest = require('restler');

const base = 'http://localhost:8080';

// test('/api/templates', async t => {
//     return rest.get(base + '/api/templates').on('success', (result) => {
//         console.log(result);
//         t.is(1, 1);
//         t.end();
//     })
// });

test('async test', t => {
    t.plan(1);
    t.pass();
    // var p = new Promise((resolve, reject) => {
    //     rest.get(base + '/api/templates').on('success', (result) => {
    //         resolve(result)
    //     })
    // });
    // return p.then(result => {
    //         t.is(result.length, 1);
    //     });
});