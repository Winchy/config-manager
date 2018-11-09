<template>
  <div>
        <div class='template-list-header'>
            <span>模板列表</span><a @click.prevent='showingCreateForm=true' href=''>[&nbsp;+&nbsp;]</a>
        </div>
            <ul class='ul-templates'>
                <li v-for='item in templates'>
                    <span class='template-name'>{{item.name}}<br/>{{item.desc}}</span>
                    <ul class='ul-template-props'>
                        <li class='template-prop' v-for='prop in item.props'><span>{{prop.desc}}:</span><span>{{prop.dataType}}</span><span v-if='prop.isList'> &#10004;数组</span></span></li>
                    </ul>
                </li>
            </ul>
        <div class='create-form-container popup-container' v-if='showingCreateForm'>
            <div class='popup-content'>
                <form class="create-form" @submit.prevent='craeteNewTemplate'>
                    <div class='form-header'>
                        <label>模板名</label>
                        <span class='prop-item'><label>英文:</label><input v-model='formData.name' type="text"></input></span>
                        <span class='prop-item'><label>中文:</label><input v-model='formData.desc' type="text"></input></span>
                    </div>
                    <hr/>
                    <ul>
                        <li class='property-li' v-for='(item, i) in formData.props'>
                            <div>
                                <div class='prop-item'><label>英文名:</label><input v-model='item.name' type='text'></input></div>
                                <div class='prop-item'><label>中文名:</label><input v-model='item.desc' type='text'></input></div>
                                <div class='prop-item'>
                                    <label>类型:</label>
                                    <select v-model='item.dataType'>
                                        <option v-for='item in dataTypes' value='item'>{{dataTypeNames[item]}}</option>
                                    </select>
                                </div>
                                <div class='prop-item'><label>数组</label><input type="checkbox" v-model='item.isList'></input></div>
                            </div>
                            <div class='prop-action' @click='removeProp'>[&nbsp;-&nbsp;]</div>
                        </li>
                        <li class='property-li'>
                            <div>
                                <div class='prop-item'><label>英文名:</label><input v-model='newProp.name' type='text'></input></div>
                                <div class='prop-item'><label>中文名:</label><input v-model='newProp.desc' type='text'></input></div>
                                <div class='prop-item'>
                                    <label>类型:</label>
                                    <select v-model='newProp.dataType'>
                                        <option v-for='item in dataTypes' value='item'>{{dataTypeNames[item]}}</option>
                                    </select>
                                </div>
                                <div class='prop-item'><label>数组:</label><input type="checkbox" v-model='newProp.isList'></input></div>
                            </div>
                            <div class='prop-action' @click='addProp'>[&nbsp;+&nbsp;]</div>
                        </li>
                    </ul>
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
        formData: {name: '', desc: '', props: []},
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
        craeteNewTemplate: function() {
            console.log("createNewTemplate");
        },
        removeProp: function() {

        },
        addProp: function() {
            console.log('sdfasd');
            this.formData.props = this.formData.props || [];
            this.formData.props.push({name: ''});
            console.log(this.formData.props);
        }
    }
};
</script>

<style scoped>

div {
    font-size: 14px;
}

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

.popup-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
}

.popup-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 20px;
    background-color: white;
}

.create-form {
    width: 600px;
    height: 500px;
    overflow-y: scroll;
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
}

.prop-action {
    width: 50px;
}

</style>