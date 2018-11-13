<template>
  <div>
    <!-- <a href='' @click.prevent='showData("abc")'>1234</a> -->
    <div class='list-container'>
        <div class='list-header'>
            <div>项目列表</div>
            <div style='cursor: pointer' @click.prevent='showingCreateForm=true'>[&nbsp;+&nbsp;]</div>
        </div>
        <ul class='ul-list'>
            <li @click='showData(item)' v-for='item in projects' class='list-item'>
                <span>{{item.name}}</span><span>{{item.createTime}}</span>
            </li>
        </ul>
    </div>
    <div v-if='showingCreateForm' class='popup-container'>
        <div class='popup-content'>
            <form class='create-project-form' @submit.prevent='addNewProject'>
                <div class='input-item'><label>项目名:</label><input type='text' v-model='newProjectName'/></div>
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
  export default {
    data: () => ({
        projects: [
            {name: "大栅栏", createTime: '2018/11/01'},
            {name: "济宁demo", createTime: '2018/11/02'},
            {name: "济宁旅游", createTime: '2018/11/01'},
        ],
        showingCreateForm: false,
        newProjectName: ""
    }),
    mounted: function() {
        console.log(this.$router);
    },
    methods: {
        showData: function(project) {
            this.$router.push({name: 'data', params: {project}});
        },
        addNewProject: function() {
            if (this.newProjectName !== "") {
                let now = new Date();
                this.projects.push({name: this.newProjectName, createTime: `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`});
                this.showingCreateForm = false;
            }
        }
    }
  };
</script>

<style scoped>

.project-intput {
    display: block;
    margin-bottom: 20px;
}

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
    margin-right: 10px;
}

input {
    height: 25px;
    border: 1px solid #CCC;
}

</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             