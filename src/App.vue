<!--
 * @Description  : 
 * @Author       : SC.beisu
 * @Date         : 2021-03-03 14:08:26
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-06 10:54:18
 * @FilePath     : /fy-deploy-cli/src/App.vue
-->
<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from '@/views/index'
import { initIpcRenderer } from '@/ipcRenderer'

export default {
  components: {Index},
  created() {
    initIpcRenderer(this)
  }
}
</script>

<style>
@import '@/assets/icons/iconfont.css';
body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
