import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')