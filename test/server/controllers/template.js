import test from "ava"
import templateController from '../../../server/controllers/template'
import mongodbTestCase from '../mongodb-test-case'
import mongoose from '../../../server/connection';

const refId1 = new mongoose.Types.ObjectId();
const refId2 = new mongoose.Types.ObjectId();

const testCaseData = [
    {
        _id: refId1,
        name: 't1',
        desc: 't1',
        properties: [{
            name: 'name1',
            desc: 't1',
            dataType: 'string',
            isList: false,
            isOptional: true,
            imageSize: {
                width: 1,
                height: 1
            }
        }]
    },
    {
        _id: refId2,
        name: 't2',
        desc: 't2',
        properties: [{
            name: 'name1',
            desc: 't1',
            dataType: 'string',
            isList: false,
            isOptional: true,
            imageSize: {
                width: 1,
                height: 1
            }
        }]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 't3',
        desc: 't3',
        properties: [{
            dataType: 'template',
            isList: false,
            isOptional: true,
            imageSize: {
                width: 1,
                height: 1
            },
            template: refId1
        }]
    }
]


test.before(async t => {
    var ret = await mongodbTestCase.init('template', [{
        Model: templateController.Model,
        data: testCaseData
    }])
})

test.after( async t => {
    await mongodbTestCase.cleanUp('template')
})

test.serial('getTemplates', t => {
    try {
        return new Promise((resolve, reject) => {
            templateController.getTemplates( (err, result) => {
                t.is(err, null);
                // t.true(result != null && result.length == testCaseData.length);
                // console.log(result);
                // t.deepEqual(result[0]._id, testCaseData[0]._id);
                resolve();   
            })
        })
    } catch (err) {
        console.log(err);
    }
})

