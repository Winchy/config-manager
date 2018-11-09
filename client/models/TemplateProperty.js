import {DataTypes} from "./DataTypes.js"

class TemplateProperty {
    constructor (options) {
        let {name, desc, dataType, isList, templateName, imageSize} = options;
        this.name = name;
        this.desc = desc;
        this.dataType = dataType;
        this.isList = isList || false;
        this.templateName = templateName || "";
        if (this.dataType === DataTypes.imageType) {
            console.log("is image, need size");
        }
        this.imageSize = imageSize;
    }

    get dataType () {
        return this._dataType;
    }

    set dataType (dataType) {
        this._dataType = dataType;
    }
}

export default TemplateProperty;