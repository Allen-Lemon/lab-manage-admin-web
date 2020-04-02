<template>
        <!--mode设置显示的是垂直还是水平，horizontal是水平-->
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#b7ae8f" active-text-color="#fcc307" background-color="#363433">
            <el-avatar :size="60" shape="circle" src="../assets/img/bg.png" alt="头像" class="elavater"></el-avatar>
            <el-submenu index="1" class="submenu">
                <!--shape设置显示的形状circle：圆形，square：方形-->
                <template slot="title">超级管理员</template>
                <el-menu-item index="1-1">设置</el-menu-item>
                <el-menu-item index="1-2" @click="userCenter()">个人中心</el-menu-item>
                <el-menu-item index="1-3">退出</el-menu-item>
            </el-submenu>
        </el-menu>
</template>

<script>
    export default {
        name: "topnav",
        data(){
            return{
                role: ''
            }
        },
        methods:{
            userCenter(){
                console.log("用户中心")
            }
        }
    }
</script>

<style scoped>
    el-menu-vertical-demo:not(.el-menu--collapse) {
        border: none;
    }
    .submenu {
        float: right;
    }
    .elavater{
        position: absolute;
        float: right;
    }

</style>