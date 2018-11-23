const mongoose = require('../connection')
const Schema = mongoose.Schema;

var templatePropSchema = new Schema({
    name: String,
    desc: String,
    dataType: String,
    isList: Boolean,
    isOptional: Boolean,
    imageSize: {
        width: Number,
        height: Number
    },
    template: { type: Schema.Types.ObjectId, ref: 'Template' }
});

var templateSchema = new Schema({
    name: String,
    desc: String,
    properties: [templatePropSchema]
})

module.exports = mongoose.model('Template', templateSchema);