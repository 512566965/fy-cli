/*
 * @Description  :
 * @Author       : SC.beisu
 * @Date         : 1985-10-26 16:15:00
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-23 08:23:52
 * @FilePath     : /fy-deploy-cli/src/components/switch/index.js
 */
import Switch from './index.vue';

/* istanbul ignore next */
Switch.install = function(Vue) {
  Vue.component(Switch.name, Switch);
};

export default Switch;

