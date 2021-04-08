<!--
 * @Description  : 边栏
 * @Author       : SC.beisu
 * @Date         : 2021-03-04 14:26:52
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 10:49:14
 * @FilePath     : /fy-deploy-cli/src/components/sideBar.vue
-->
<template>
  <div class="root">
    <div class="items" ref="menuList">
      <div :class="{'item': true, 'checked': isChecked('projectConfig')}" id="projectConfig" @click="handleClick">
        项目配置
      </div>
      <div :class="{'item': true, 'checked': isChecked('bConfig')}" id="bConfig" @click="handleClick">
        服务器配置
      </div>
      <div :class="{'item': true, 'checked': isChecked('hosts')}" id="hosts" @click="handleClick">
        本机host
      </div>
      <div :class="{'item': true, 'checked': isChecked('mock')}" id="mock" @click="handleClick">
        mock
      </div>
    </div>
    <div
      class="footer"
    >
      <span class="icon iconfont icon-set1"></span>
      <span class="icon iconfont icon-jia"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedID: 'hosts'
    }
  },
  methods: {
    handleClick (e) {
      this.checkedID = e.target.id
      this.$emit('change', e.target.id)
    },
    isChecked (e) {
      return e === this.checkedID
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_conf.scss';
@import '@/assets/css/themes/light/colors.scss';

$menu_width: 160px;
$menu_handler_size: 24px;
$swh-border-color: blue;

:root {
  --swh-border-color: red;
  --swh-font-color-hl: blue;
}
.root {
  position: fixed;
  display: inline-block;
  z-index: 100;
  width: $side_bar_width;
  height: 100%;
  overflow: hidden;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding-bottom: $menu_handler_size;
  user-select: none;
  -webkit-app-region: no-drag;
  .items {
    min-height: 100px;
    border: 1px solid var(--swh-border-color, transparent);
    line-height: 2.2em;
    width: $side_bar_width;
    overflow: hidden;
    user-select: none;
    .item {
      padding: 4px 10px;
      line-height: 2.2em;
      border: 1px solid #cccccc;
      cursor: pointer;
      &:hover {
        // color: var(--swh-font-color-hl);
      }
    }
    .checked {
      background-color: cornflowerblue;
      color: #fff;
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    background-image: url(../assets/icons/setting.svg);
    background-size:100% 100%;
    background-repeat:no-repeat;
    height: 20px;
    width: 240px;
    display: flex;
    justify-content: space-between;
    & > span {
      padding: 0 10px;
    }
  }
}
</style>