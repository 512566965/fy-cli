<!--
 * @Description  : 首页
 * @Author       : SC.beisu
 * @Date         : 2021-03-03 11:11:24
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 10:31:56
 * @FilePath     : /fy-deploy-cli/src/views/index.vue
-->
<template>
  <div class="root">
    <SideBar class="menu" @change="handleChange"/>
    <Content
      class="content"
      :key="sideMenu"
      :showComponent="sideMenu"
    />
  </div>
</template>

<script>
import SideBar from '@/components/sideBar'
import Content from '@/components/content'
export default {
  data() {
    return {
      sideMenu: 'hosts'
    }
  },
  components: { SideBar, Content },
  methods: {
    handleChange(e) {
      this.sideMenu = e
    }
  }
}
</script>

<style lang="scss">
.root {
  display:flex;
  overflow: hidden;
  height: 100%;
  .menu {
    flex: none;
  }
}
</style>