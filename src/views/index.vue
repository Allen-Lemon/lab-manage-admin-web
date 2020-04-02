<template>
        <el-container class="index-con">
            <el-aside class="asideshow">
                <leftnav></leftnav>
            </el-aside>
            <el-container class="main-con">
                <el-header class="index-header">
                    <topnav></topnav>
                </el-header>
                <el-main class="index-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>

<script>
    import topnav from "../components/header";
    import leftnav from "../components/leftnav";

    export default {
        name: "index",
        data(){
            return {}
        },
        components:{
            topnav,
            leftnav

        }

    }
</script>

<style scoped>
    .index-con {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }

    .aside {
        width: 64px !important;
        height: 100%;
        background-color: #334157;
        margin: 0px;
    }
    .asideshow {
        width: 240px !important;
        height: 100%;
        background-color: #334157;
        margin: 0px;
    }
    .index-header,
    .index-main {
        padding: 0px;
    }
    main.el-main.index-main {
        margin: 10px 0px 0px 10px;
    }
</style>