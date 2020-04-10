/**左边导航菜单*/
<template>
        <!--collapse-transition开启折叠动画,collapse是否把菜单折叠起来（默认是否） router :default-active="$route.path"-->
        <el-menu :collapse="isCollapsed" router :default-active="$route.path"  class="el-menu-vertical-demo" collapse-transition unique-opened  background-color="#2f2f35" text-color="#bec936" active-text-color="#fed71a">
                <el-submenu v-for = "menu in allmenu" :key="menu.resourceId" :index="menu.name">
                    <template slot="title">
                        <i class="iconfont" :class="menu.icon"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="child in menu.childMenu" :index="child.uri" :key="child.resourceId">
                            <i class="iconfont" :class="child.icon"></i>
                            <span>{{child.name}}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
        </el-menu>
</template>

<script>
    import {menu} from "../api/request";

    export default {
        name: "leftnav",
        data() {
                return {
                    isCollapsed: false,
                    allmenu:[],
                    user:{
                        userId:''
                    }
                };
            },
        methods: {

        },
        created() {
            //从vuex中获取用户的id
            var userInfo = this.$store.getters.token;
            var userId = userInfo.userId;
             this.user.userId =userId;
            //把用户id的当成参数传入
            menu(this.user).then(res =>{
                if (res.code == 0){
                    this.allmenu = res.data;
                }else{
                    //查询菜单出现错误
                    this.$toast.error({
                        title: '错误提示',
                        message: '菜单查询失败',
                        timeout: 5000
                    });
                }
            });
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 400px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        border: none;
        text-align: left;
    }
    .el-menu-item-group__title {
        padding: 0px;
    }
    .el-menu-bg {
        background-color: #1f2d3d !important;
    }
    .el-menu {
        border: none;
    }
    .logobox {
        height: 40px;
        line-height: 40px;
        color: #9d9d9d;
        font-size: 20px;
        text-align: center;
        padding: 20px 0px;
    }
    .logoimg {
        height: 40px;
    }
</style>