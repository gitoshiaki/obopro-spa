import '@/stylus/entry.styl';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

__SIMPLE_API_ENDPOINT__ = "https://api.graph.cool/simple/v1/cjmsq7p9h9c1y0110ulbx5bnk"
const networkInterface = createNetworkInterface({ uri: __SIMPLE_API_ENDPOINT__ })