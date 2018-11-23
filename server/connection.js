// const MongoClient = require("mongodb").MongoClient;
// // console.log(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`);
// // var connection = MongoClient.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`, { useNewUrlParser: true }, 
// //     function(err, mongoclient) {
// //         if (err) {
// //             console.log(err)
// //         }
// //         var db = mongoclient.db('CMP');
// //         db.collection("test").find({}, {_id: 0, cc: "$b"}, function(err, result) {
// //             result.hasNext().then(data => console.log(data)) 
// //             result.next().then(data => console.log(data)) 
// //             result.next().then(data => console.log(data)) 
// //             mongoclient.close();
// //           });
// //     });

// setTimeout(() => {
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// }, 1000)
// console.log('')
// module.exports = {};

const config = require('../config')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`, { useNewUrlParser: true });
// mongoose.connect(`mongodb://${config.dbHost}/${config.dbName}`, { useNewUrlParser: true });

module.exports = mongoose;

/*
var TestSchema = new Schema({
    "b": Number,
    "a": Number
}, { collection: 'test', id: false} )

// TestSchema.statics.findByB = function(b, cb) {
//     this.model('test').find({b}).then(result => {
//         cb(result);
//     });
// }

// TestModel = mongoose.model('test', TestSchema);
// var tt = new TestModel();
// tt.findByB(1, (result) => {
//     console.log(result);
// })
// TestModel.findByB(333, result=> console.log(result))
// TestModel.find({b: 1}).then(result => console.log(result))

TestSchema.query.byB = function(b) {
    return this.where({b})
}

TestSchema.virtual('sum').get(function() {
    return this.b + this.a;
})

TestModel = mongoose.model('test', TestSchema);


TestModel.find().byB(1).exec((err, result) => {
    if (result) {
        result.forEach(r => {
            console.log(r, r.sum)
        })
    }
})

TestModel.findOne().byB(1).exec((err, result) => {
    console.log(err, result, result.sum, result._id);
})

var tm = new TestModel({b: 1, a: 1});
console.log(tm.sum)
// TestModel.update({b: 1}, {$set: {b: 3}}, (err, result) => {
//     console.log(err, result);
// })

TestModel.findOneAndUpdate({b: 2}, {$set: {b: 5}}, {new: false}, (err, result) => {
    console.log(err, result);
})

// tm.save();
// tm.find().then(result=>console.log(result))
*/