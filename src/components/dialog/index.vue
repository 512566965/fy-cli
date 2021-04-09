<!--
 * @Description  : 提示
 * @Author       : SC.beisu
 * @Date         : 2021-04-06 11:03:12
 * @LastEditors: Sc
 * @LastEditTime: 2021-04-09 14:14:09
 * @FilePath     : /fy-deploy-cli/src/components/dialog/index.vue
-->
<template>
  <div
    v-show="visible"
    class="wrapper"
    @click.self="handleWrapperClick"
  >
    <div
      class="dialog"
    >
      <div
        class="dialog__title"
      >{{title}}<span v-if="showCloseBtn" class="icon iconfont icon-close" @click="handleAction('close')"></span></div>
      <div
        class="dialog__body"
      ><span :class="['dialogIcon icon iconfont', icon]"></span>{{message}}</div>
      <div
        class="dialog__footer"
      >
        <button v-if="showCancelBtn" @click="handleAction('cancel')">{{cancelBtnText || '取消'}}</button>
        <button v-if="showConfirmBtn" @click="handleAction('confirm')">{{confirmBtnText || '确定'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
const typeMap = {
  succeed: 'icon-security-fill'
  , info: 'icon-tishi'
  , warning: 'icon-prompt-fill'
  , error: 'icon-warning-fill'
  , loading: 'icon-load-a rotateing'
}
export default {
  name: 'dialogVue',
  data () {
    return {
      type: '',
      visible: false,
      action: '',
      title: undefined,
      message: '',
      showConfirmBtn: true,
      showCancelBtn: true,
      showCloseBtn: false,
      wrapperClick: true,
      confirmBtnText: '',
      cancelBtnText: '',
      callback: null
    }
  },
  computed: {
    icon() {
      console.log(this.type)
      return typeMap[this.type]
    }
  },
  methods: {
    handleAction (action){
      this.action = action
      // this.beforeClose()
      this.doclose()
    },
    handleWrapperClick () {
      if (!this.wrapperClick) return
      this.doclose()
    },
    doclose () {
      if (!this.visible) return
      this.visible = false
      // this.afterClose()
      setTimeout(() => {
        if (this.action) this.callback(this.action, this)
      })
    }
  },
  destroyed(){

  },
  beforeDestroy() {}
}
</script>

<style lang="scss">
// @-webkit-keyframes rotate { from { margin-left: -20%; } to { margin-left: 100%; }  }
@keyframes rotate { from { transform: rotate(0deg) } to {  transform: rotate(359deg) }  }
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    min-width: 200px;
    &__title {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      // & > span {
      // }
    }
    &__body {
      margin: 15px 0;
      color: #575A5D;
      & > .dialogIcon {
        display: inline-block;
        margin: 0 10px;
        font-size: 24px;
        // transition: transform linear 2s;
        // transform: rotate(180deg);
      }
      & > .rotateing {
        animation: 3s ease 0s infinite rotate;
      }
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
      & > button {
        border: transparent;
        border-radius: 4px;
        background: #0096FA;
        padding: 4px 8px;
        margin: 0 4px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>