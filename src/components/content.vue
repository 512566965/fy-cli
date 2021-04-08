<!--
 * @Description  : 主内容
 * @Author       : SC.beisu
 * @Date         : 2021-03-05 08:25:36
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-31 13:27:39
 * @FilePath     : /fy-deploy-cli/src/components/content.vue
-->
<template>
  <div class="content">
    <keep-alive>
      <component v-for="(item, index) in componentObj" :key="index" v-bind:is="item"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
      componentObj: {}
    }
  },
  props: {showComponent: String},
  // components: { hosts: () => import('@/views/hosts') },
  // components: { hosts: resolve => require(['@/views/hosts'], resolve) },
  created() {
    this.componentObj = {}
    this.componentObj[this.showComponent] = () => import('@/views/'+ this.showComponent)

  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_conf.scss';
.content {
  flex: auto;
  overflow: hidden;
  height: 100%;
  margin-left: $side_bar_width;
}
</style>
