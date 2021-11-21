import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')