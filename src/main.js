/*
 * @Description  : vue入口
 * @Author       : SC.beisu
 * @Date         : 2021-03-03 14:08:18
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-07 10:54:03
 * @FilePath     : /fy-deploy-cli/src/main.js
 */
import Vue from 'vue'
import App from './App'
import DialogBox from './components/dialog/main'

Vue.prototype.$dialog = DialogBox

new Vue({
  el: '#app',
  render: h=> h(App)
})
