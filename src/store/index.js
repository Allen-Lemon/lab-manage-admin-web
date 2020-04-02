import Vue from 'vue'
import Vuex from 'vuex'

//在vue中注册Vuex(全局的共享的数据仓库)
Vue.use(Vuex)

const store = new Vuex.Store({
    //状态数据管理，用来定义数据变量初始化,相当于组件中的data
    state: {
        userInfo: "",
    },
    //用逻辑方法来对state定义的数据做修改，相当于组件中methods
    mutations: {
        //调用的时候使用this.$store.commit('login',参数)
        login(state, userInfo) {
            //把存入vuex中的user数据进行json格式化，把存入本地的保存为字符串
            var user = JSON.stringify(userInfo);
            state.userInfo = JSON.parse(user);
            localStorage.setItem("user", user);
        },
        //退出登录,清除登录时候保存在全局中跟本地的用户信息
        logout(state) {
            state.userInfo = "";
            localStorage.removeItem("user");
        },
        assignmentStore(state, userInfo) {
            state.userInfo = JSON.parse(userInfo);
        }
    },
    /*
    1.在如果组件想要直接获取到state中的值可以使用:$store.state.xxx(xxx表示我们state中定义的属性，当前Vuex中userInfo)
    2.如果需要对vuex中的数据进行包装就要使用getter方法，这里只提供包装数据，不能修改数据，修改在mutations中，其他地方获取getter
    中的数据使用this.$store.getter.xxx(xxx是：'方法名')
     */
    getters: {
        token: function (state) {
            return state.userInfo
        }
    }
});
//对外暴露出一个接口，给其他模块调用（这是es6的语法）
export default store;