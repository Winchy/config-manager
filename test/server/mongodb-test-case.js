// const mongoose = require('../../server/connection');

class MongodbTestCase {

    constructor() {
        this.tests = {};
    }

    async init(testName, testCases) {
        if (this.tests[testName]) {
            reject('test already initialized in mongodb test cases');
            return;
        }
        this.tests[testName] = [];

        await Promise.all(testCases.map( async ({Model, data}) => {
            var l = [];
            await Promise.all(data.map(async doc => {
                var model = new Model(doc);
                var ret = await model.save();
                // console.log(ret._id)
                l.push(ret);
            }))
            this.tests[testName].push(l);
        }))
        return this.tests[testName];
    }

    async cleanUp(testName) {
        await Promise.all(this.tests[testName].map(async models => {
            await Promise.all(models.map(async model => {
                await model.remove();
            }))
        }))
    }
}

module.exports = new MongodbTestCase()