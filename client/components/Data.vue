<template>
  <div class='content'>
        <h2>{{project}}</h2>
        <div class='data-content'>
            <div class='list-container document-list'>
                <div class='list-header'>
                    <div>配置列表</div>
                    <div style='cursor: pointer' @click.prevent='showingDocumentForm=true'>[&nbsp;+&nbsp;]</div>
                </div>
                <ul class='ul-list'>
                    <li @click='showData(item, i)' v-for='(item, i) in documents' class="list-item" v-bind:class='(i == currentDocIndex)? "selected-document" : ""'>
                        <span>{{item.desc}}</span></span>
                    </li>
                </ul>
            </div>
            <div class='collection-table'>
                <div class='collection-table-header'>
                    <div v-for='prop in currentTemplate.props' class='collection-cell'>{{prop.desc}}</div>
                    <div class='collection-cell'><a class='row-action' @click.prevent='' href=''>[&nbsp;+&nbsp;]</a></div>
                </div>
                <div v-for='item in collections' class='collection-row'>
                    <div v-for='value in item' class='collection-cell'>{{value}}</div>
                    <div class='collection-cell'>
                        <a class='row-action' @click.prevent='' href=''>编辑</a>
                        <a class='row-action' @click.prevent='' href=''>删除</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if='showingDocumentForm' class='popup-container'>
            <div class='popup-content'>
                <form class='create-project-form' @submit.prevent='addNewDocument'>
                    <div class='input-item'><label>配置名:</label><input type='text' v-model='newDocument.name'/></div>
                    <div class='input-item'><label>配置描述:</label><input type='text' v-model='newDocument.desc'/></div>
                    <div class='input-item'><label>模板名:</label><input type='text' v-model='newDocument.templateName'/></div>
                    <div class='form-actions'>
                        <button @click.prevent='showingDocumentForm = false'>取消</button>
                        <button>保存</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if='showingCollectionForm' class='popup-container'>
            <div class='popup-content'>
                <form class='create-project-form' @submit.prevent='addNewDocument'>
                    <div class='input-item'><label>项目名:</label><input type='text' v-model='newProjectName'/></div>
                    <div class='form-actions'>
                        <button @click.prevent='showingDocumentForm = false'>取消</button>
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
        project: "",
        documents: [
            {name: "shopInfo", desc: "商店信息", templateName: "article"},
            {name: "toiletInfo", desc: "厕所信息"},
            {name: "scenicInfo", desc: "景点信息"},
            {name: "hotelInfo", desc: "酒店"},
            {name: "scenicDetail", desc: "景点详情"},
            {name: "shopInfo", desc: "商店信息"},
            {name: "shopInfo", desc: "商店信息"},
        ],
        collections: [
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
            {name: '游大栅栏', subTitle: '大栅栏是个好地方', image: '', sections: []},
        ],
        templates: [],
        newDocument: {name: '', desc: '', templateName: ''},
        showingDocumentForm: false,
        currentDocIndex: 0,
        showingCollectionForm: 0,
        currentTemplate: {}
    }),
    mounted: function() {
        this.project = this.$route.params.project && this.$route.params.project.name || '.';

        var articleTemplate = new Template("article", "文章");
        articleTemplate.props.push(new TemplateProperty({name: "name", desc: "文章名", dataType: DataTypes.stringType }));
        articleTemplate.props.push(new TemplateProperty({name: "subTitle", desc: "子标题", dataType: DataTypes.stringType }));
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

        this.currentTemplate = articleTemplate;
    },
    methods: {
        showData: function(item, i) {
            this.currentDocIndex = i;
        },
        addNewDocument: function() {
            if (this.newDocument.name && this.newDocument.desc && this.newDocument.templateName) {
                this.documents.push(this.newDocument);
                this.showingDocumentForm = false;
            }
        },
        addNewCollection: function() {
            this.showingCollectionForm = false;
        }
    }
  };
</script>

<style scoped>
.form-actions {
    float: right;
}

.form-actions > button {
    margin-left: 20px;
}

.input-item {
    margin-bottom: 10px;
}

.input-item > label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
}

input {
    height: 25px;
    border: 1px solid #CCC;
}

.document-list {
    width: 150px;
}

.data-content {
    display: flex;
}

.selected-document {
    background-color: bisque;
}

.collection-table {
    flex: 1;
    margin-left: 50px;
    display: table;
    line-height: 25px;
    border-left: 1px solid #DDD;
}

.collection-table-header {
    display: table-header-group;
    background-color: #dfe1c2;
    font-weight: bold;
}

.collection-table-header, .collection-row {
    padding: 5px 20px;
}

.collection-row {
    display: table-row;
}

.collection-cell {
    display: table-cell;
    text-align: center;
    border-right: 1px solid #DDD;
    border-bottom: 1px solid #DDD;
}

.row-action {
    display: inline-block;
    margin-left: 10px;
}
</style>