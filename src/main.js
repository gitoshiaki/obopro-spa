import '@/stylus/entry.styl';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/index'
import AuthService from '@/Auth/AuthService'
import 'vue-loaders/dist/vue-loaders.css';
import { BallBeatLoader } from 'vue-loaders';
import pageContainer from '@/components/pageContainer'
import FontAwesomeIcon from '@/util/fontawesome'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)

Vue.use(Buefy)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("page-container", pageContainer)

Vue.config.productionTip = false;
// auth0 service
Vue.prototype.$auth0 = new AuthService()
// vue loaders
Vue.component(BallBeatLoader.name, BallBeatLoader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
