<template>
  <div id='app'>
    <header class='top-pannel'>
        <h3 class='title-main'>配置管理平台</h3>
        <nav class='nav-main'>
            <router-link to='/' class='nav-item-main'>首页</router-link>
            <router-link to='/templates' class='nav-item-main'>模板</router-link>
            <router-link to='/projects' v-on:showdata='console.log($event, "----")' class='nav-item-main'>项目</router-link>
        </nav>
    </header>
    
    <!-- <p>
        <router-link to='/'>Home</router-link>
        <router-link to='/about'>About</router-link>
    </p> -->
    <router-view class='content'></router-view>
  </div>
</template>
<script>
    export default {
        data: () => ({
            dataType: Symbol.for("abc")
        })
    };
</script>

<style>
body, div, ul {
    margin: 0;
    padding: 0;
    font-size: 14px;
}
body {
    min-width: 960px;
}
ul {
    list-style-type: none;
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

.top-pannel {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    background: black;
    padding: 0 50px;
    color: white;
}
.title-main {
    margin: 0;
}
.nav-main {
    line-height: 40px;
}
.nav-item-main {
    margin-left: 20px;
    color: white;
    text-decoration: none;
}
.router-link-exact-active {
    color: burlywood;
}
.content {
    padding: 30px;
    width: 960px;
    margin: 0 auto;
}
.list-container {
    width: 250px;
    border-radius: 5px;
    overflow: hidden;
    /*border: 1px solid #EEE;*/
    box-shadow: 1px 1px 5px 0px #CCC;
}

.list-header, .list-item{
    line-height: 25px;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
}

.list-item > span {
    display: block;
    margin-right: 20px;
}

.list-item > span:last-child {
    margin-right: 0;
}

.list-header {
    background-color: burlywood;
}

.ul-list {
    background-color: honeydew;
}

.list-item {
    cursor: pointer;
}

.list-item:nth-child(even) {
    background-color: aquamarine;
}

.list-item:hover {
    background-color: lightgreen;
}
</style>