<template>
  <div>
        <div class='template-list-header'>
            <span>模板列表</span><a @click.prevent='showingCreateForm=true' href=''>[&nbsp;+&nbsp;]</a>
        </div>
            <ul class='ul-templates'>
                <li v-for='item in templates'>
                    <span class='template-name'>{{item.name}}<br/>{{item.desc}}</span>
                    <ul class='ul-template-props'>
                        <li class='template-prop' v-for='prop in item.props'><span>{{prop.desc}}:</span><span>{{dataTypeNames[prop.dataType]}}</span><span v-if='prop.isList'> &#10004;数组</span></span></li>
                    </ul>
                </li>
            </ul>
        <div class='create-form-container popup-container' v-if='showingCreateForm'>
            <div class='popup-content'>
                <form class="create-form" @submit.prevent='createNewTemplate'>
                    <div class='form-header'>
                        <label>模板名</label>
                        <span class='prop-item'><!-- <label>英文:</label> --><input v-model='formData.name' type="text"></input></span>
                        <span class='prop-item'><label>描述:</label><input v-model='formData.desc' type="text"></input></span>
                    </div>
                    <hr/>
                    <ul class='ui-property'>
                        <li class='property-li' v-for='(item, i) in formData.props'>
                            <div>
                                <div class='prop-item'><label>英文名:</label><input v-model='item.name' type='text'></input></div>
                                <div class='prop-item'><label>描述:</label><input v-model='item.desc' type='text'></input></div>
                                <div class='prop-item'>
                                    <label>类型:</label>
                                    <select v-model='item.dataType' @change="changeDataType(i, $event)" data-idx='i'>
                                        <option v-for='item in dataTypes' v-bind:value='item'>{{dataTypeNames[item]}}</option>
                                    </select>
                                    <span v-if='item.dataType=="datatype.template"'><lable>&nbsp;&nbsp;模板:</lable><!-- <input v-model='item.templateName'></input> -->
                                        <select v-model='item.templateName'>
                                            <option v-for='item in templates' :value='item.name'>{{item.desc}}</option>
                                        </select>
                                    </span>
                                </div>
                                <div class='prop-item'><label>数组</label><input type="checkbox" v-model='item.isList'></input></div>
                                <div class='prop-item'><label>可空</label><input type="checkbox" v-model='item.optinal'></input></div>
                            </div>
                            <div v-if='i == formData.props.length - 1' class='prop-action' @click='addProp()'>[&nbsp;+&nbsp;]</div>
                            <div v-else class='prop-action' @click='removeProp(i)'>[&nbsp;-&nbsp;]</div>
                        </li>
                    </ul>
                    <div class='form-actions'>
                        <button @click.prevent='showingCreateForm = false'>取消</button>
                        <button>保存</button>
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>
<script>
import {DataTypes, DataTypeNames} from "../models/DataTypes.js"
import Template from "../models/Template.js"
import TemplateProperty from "../models/TemplateProperty.js"

export default {
    data: () => ({
        templates: [],
        showingCreateForm: false,
        formData: {name: '', desc: '', props: [{}]},
        newProp: {},
        dataTypes: DataTypes,
        dataTypeNames: DataTypeNames,
    }),
    mounted: function() {
        var articleTemplate = new Template("article", "文章");
        articleTemplate.props.push(new TemplateProperty({name: "name", desc: "文章名", dataType: DataTypes.stringType }));
        articleTemplate.props.push(new TemplateProperty({name: "title", desc: "标题", dataType: DataTypes.stringType }));
        articleTemplate.props.push(new TemplateProperty({name: "image", desc: "题图", dataType: DataTypes.imageType }));
        articleTemplate.props.push(new TemplateProperty({name: "sections", desc: "章节", dataType: DataTypes.templateType, isList: true, templateName: "section" }));
        var sectionTemplate = new Template("section", "章节");
        sectionTemplate.props.push(new TemplateProperty({name: "name", desc: "章节名", dataType: DataTypes.stringType}));
        sectionTemplate.props.push(new TemplateProperty({name: "paragraph", desc: "段落", dataType: DataTypes.templateType, isList: true, templateName: "paragraph"}));
        var paragraphTemplate = new Template("paragraph", "段落");
        paragraphTemplate.props.push(new TemplateProperty({name: "name", desc: "段落名", dataType: DataTypes.stringType}));
        paragraphTemplate.props.push(new TemplateProperty({name: "passages", desc: "段落文本", dataType: DataTypes.passageType, isList: true}));
        paragraphTemplate.props.push(new TemplateProperty({name: "images", desc: "图片", dataType: DataTypes.imageType, isList: true}));
        this.templates = this.templates.concat([paragraphTemplate, sectionTemplate, articleTemplate]);
        console.log(this.templates);
    },
    methods: {
        createNewTemplate: function() {
            console.log("createNewTemplate");
            this.saveTemplate();
        },
        removeProp: function(idx) {
            console.log(idx);
            this.formData.props = this.formData.props || [];
            this.formData.props.splice(idx, 1);
            console.log(this.formData.props);
        },
        addProp: function() {
            this.formData.props = this.formData.props || [];
            this.formData.props.push({name: ''});
            console.log(this.formData.props);
        },
        saveTemplate: function() {
            if (this.validateTemplate(this.formData)) {
                let newTemp = new Template(this.formData.name, this.formData.desc);
                this.formData.props.forEach(prop => {
                    newTemp.props.push(new TemplateProperty(prop));
                })
                this.formData = {};
                this.templates.push(newTemp);
                this.showingCreateForm = false;
                console.log(this.templates);
            }
        },
        validateTemplate: function(template) {
            return true;
        },
        changeDataType: function(i, event) {
            var item = this.formData.props[i];
            item.dataType = event.target.value;
            // this.formData.props.splice(i, 1, item);
            console.log(item, event);
        }
    }
};
</script>

<style scoped>

.template-list-header, .ul-templates {
    padding: 10px 20px;
    margin: 0 auto 20px auto;
}

.template-list-header {
    background-color: burlywood;
    display: flex;
    width: 760px;
    justify-content: space-between;
}

.template-list-header > span {
    display: block;
}

.template-list-header > a {
    display: block;
    color: black;
    text-decoration: none;
}

.ul-templates {
    list-style-type: none;
    font-size: 14px;
    width: 800px;
    overflow: hidden;
}

.ul-templates > li {
    min-height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 10px;
}

.template-name {
    width: 100px;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
}

.ul-template-props {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
}

.template-prop {
    display: block;
    width: 280px;
}

.template-prop > span {
    display: inline-block;
    margin-right: 20px;
    line-height: 25px;
}

.create-form {
    width: 600px;
    height: 600px;
}

.ui-property {
    height: calc(100% - 70px);
    overflow-y: auto;
}

.property-li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 5px;
    border: 1px solid #EEE;
    border-radius: 5px;
}

.property-li label {
    width: 50px;
    display: inline-block;
    margin-right: 10px;
}

.prop-item {
    height: 25px;
    line-height: 25px;
    margin-right: 20px;
}

.prop-item>label {
    margin-right: 10px;
}

.prop-action {
    width: 50px;
}

.form-actions {
    float: right;
}

.form-actions > button {
    margin-left: 20px;
}

</style>