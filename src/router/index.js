import Vue from "vue"
//导入路由，这里使用VueRouter跟Router都是一样的
import Router from 'vue-router'
import store from "../store";

//在VUE中注册路由
Vue.use(Router)

/*
在这里要注意使用的注册的组件是全局组件使用component，
而使用components是注册局部组件，只能在当前页面上使用,
() => import('../views/login') 这是VUE提供的路由懒加载的方式
 meta:{   require: false } 这里是要用路由钩子函数来判断去的页面是否有权限,
 false是不需要权限都可以去，true是需要有对应的登录的token才能去,
 children:是定义子组件的，而且子组件路由地址的开头不能加 /
*/

const routes = [{
    path: '/',
    name: '登录',
    hidden: true,
    component: () => import('../views/Dashboard'),//为了方便，后续会改回来
    meta: {
        require: false
    }
},
    {
        path: '/login',
        name: "登录",
        hidden: true,
        component: () => import('../views/login'),
        meta: {
            require: false
        }
    },
    {
        path: '/register',
        name: '注册',
        component: () => import('../views/register'),
        meta: {
            require: false
        }

    },
    {
        path: '/index',
        name: "首页",
        component: () => import('../views/index'),
        hidden: true,
        meta: {
            require: true
        },
        children: [{
            path: '/system/user',
            name: "用户管理",
            component: () => import('../views/system/user'),
            meta: {
                require: true
            }
        },
            {
                path: "/system/role",
                name: "角色管理",
                /* component: () => import('../views/system/permission'),*/
                component: () => import('../views/system/role'),
                meta: {
                    require: true
                }
            },
            {
                path: "/system/resource",
                name: "资源管理",
                component: () => import('../views/system/resource'),
                meta: {
                    require: true
                }
            },
            {
                path: "/order/reserve",
                name: "订单预约",
                component: () => import('../views/order/reserve'),
                meta: {
                    require: true
                }
            },
            {
                path: "/order/examine",
                name: "查看订单",
                component: () => import('../views/order/examine'),
                meta: {
                    require: true
                }
            },
            {
                path: "/order/details",
                name: "订单详情",
                component: () => import('../views/order/details/index'),
                meta: {
                    require: true
                }
            },
            {
                path: "/laboratory/instrument",
                name: "实验室管理-实验仪器管理",
                component: ()  => import('../views/laboratory/instruct/index'),
                meta:{
                    require: true
                }
            },
            {
                path: "/laboratory/room",
                name: "实验室管理-房间管理",
                component: ()  => import('../views/laboratory/index'),
                meta:{
                    require: true
                }
            }
        ]
    }];
const router = new Router({
    //把定义的路由的跳转加入到Vue的路由中
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});
/* 全局导航守卫，给路由添加钩子函数
(to,from,next) to:是要去的路由地址，from：是当前导航正要离开的路由，next:执行钩子函数去
 */
router.beforeEach((to, from, next) => {
    console.log("路由要去：" + to.path)
    if (to.matched.length != 0) { //去的路由的匹配地址不为空
        if (to.meta.require) {  //要去的组件是否需要登录
            //在跳转路由的时候判断用户是否登录
            if (localStorage.getItem("user")) {
                next();
            } else {
                next({
                    path: "/login", //用户没有登录就跳转到登录页面
                    query: {redirect: to.fullPath} //把当前的地址当成参数，用户登录成功以后跳转到该路由
                });
            }
        } else {
            //去的组件不需要登录
            next();
        }
    } else {
        next({
            path: "/login",
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
});

//当页面刷新的时候重新赋值给vuex,后续看这里有效没得，如果没有先加上window测试
if (localStorage.getItem("user")) {
    var user = localStorage.getItem("user");
    /*store.state.userInfo = */
    store.commit('assignmentStore', user)
}
export default router;