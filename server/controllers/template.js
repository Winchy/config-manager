const TemplateModel = require('../models/template')

class TemplateController {
    constructor() {
        this.Model = TemplateModel;
    }

    getTemplates(cb) {
        // console.log('++++++++++++++++++++++++', TemplateModel.collection)
        TemplateModel.find({}, (err, result) => {
            cb(err, result);
        })
    }

}

module.exports = new TemplateController();