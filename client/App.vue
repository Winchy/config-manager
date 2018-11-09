<template>
  <div id='app'>
    <header class='top-pannel'>
        <h3 class='title-main'>配置管理平台 {{dataType}}</h3>
        <nav class='nav-main'>
            <router-link to='/' class='nav-item-main'>首页</router-link>
            <router-link to='/templates' class='nav-item-main'>模板</router-link>
            <router-link to='/projects' class='nav-item-main'>项目</router-link>
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
}
body {
    min-width: 960px;
}
ul {
    list-style-type: none;
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
}
</style>