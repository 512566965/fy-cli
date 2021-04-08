<!--
 * @Description  : mock页面
 * @Author       : SC.beisu
 * @Date         : 2021-04-02 11:03:39
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 14:11:48
 * @FilePath     : /fy-deploy-cli/src/views/mock.vue
-->
<template>
<div>
  <div @click="handleClick('succeed')">succeed</div>
  <div @click="handleClick('warning')">warning</div>
  <div @click="handleClick('error')">error</div>
  <div @click="handleClick('info')">info</div>
  <div @click="handleClick('loading')">loading</div>
  <div @click="handleClose('')" >销毁</div>


</div>
</template>
<script>
export default {
  methods: {
    handleClick (type) {
      this.$dialog({type: type, message: '正在打包中...', title: '提示'}).then(res => {
      }).catch(e => console.log(e))
    },
    handleClose() {
      this.$dialog.close()
    }
  }
}
</script>