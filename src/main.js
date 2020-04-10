import Vue from 'vue'
import App from './App.vue'
//导入vuex跟路由
import router from './router'
import store from './store'

//本地导入图标
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
//导入全局的弹窗提示
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import CxltToastr from 'cxlt-vue2-toastr'
Vue.use(CxltToastr)
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
const  content =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default content;