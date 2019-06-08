import Vue from 'vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../public/styles/style.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
        render: h => h(App),
        router: router,
        store: store
    }).$mount('#app')

