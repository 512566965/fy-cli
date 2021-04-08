<!--
 * @Description  : 主内容
 * @Author       : SC.beisu
 * @Date         : 2021-03-05 08:25:36
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 10:34:44
 * @FilePath     : /fy-deploy-cli/src/views/hosts.vue
-->
<template>
  <div class="hosts">
    <div class="host">
      <div class="host__header"><span>当前host</span>
      </div>
      <div class="host__content"><textarea :value="systemHost.content"></textarea></div>
      <div class="host__footer">
      </div>
    </div>
    <div class="host" v-for="(value, index) in hostList" :key="index">
      <div class="host__header"><span>{{value.title}}</span>
        <Sswitch
          v-model="value.on"
          @change="handleChange"
        />
      </div>
      <div class="host__content"><textarea v-model="value.content" :id="value.id" @change="handleChangeHost"></textarea></div>
      <div class="host__footer">
        <span class="button">上传</span>
        <span class="button" @click="deleteHost">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import Sswitch from '@/components/switch/index.vue'
import { sendSync } from '@/utils/renderer'

export default {
  data () {
    return {
      hostList: Array,
      systemHost: {},
    }
  },
  components: { Sswitch },
  mounted () {
    this.initData()
  },
  methods: {
    // isChecked (id) {
    //   let result = false
    //   if (~this.usedId.indexOf(id)) result = true
    //   return result
    // },
    initData () {
      sendSync('getHosts').then(result => {
        console.log(result)
        this.hostList = result.user_hosts
        this.systemHost = result.sys_hosts
      })
    },
    handleChange() {
      sendSync('switchHost').then(res => {
        console.log(res)
      })
      this.handleChangeHost()
    },
    handleChangeHost() {
      sendSync('saveHost', this.hostList).then(res => {
        console.log(res)
        this.initData()
      })
    },
    deleteHost () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_conf.scss';
.hosts {
  position: relative;
  // left: $side_bar_width;
  display: flex;
  flex-wrap: wrap;
  .host {
    flex: 0 1 300px;
    padding: 5px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    margin: 5px;
    position: relative;
    &__header {
      position: relative;
      line-height: 20px;
      height: 20px;
      vertical-align: center;
    }
    &__content {
      & > textarea {
        background: #ccc;
        border: transparent;
        border-radius: 3px;
        width: 100%;
        height: 300px;
        color:cadetblue;
        // padding: 10px;
      }
      background: #ccc;
      height: 300px;
      color:cadetblue;
      margin: 5px 2px 30px 2px;
      border-radius: 3px;
    }
    &__footer {
      position: absolute;
      bottom: 5px;
      height: 20px;
      line-height: 20px;
      .button {
        border: 1px solid #DCDFE6;
        border-radius: 8px;
        padding: 2px 10px;
        font-size: 14px;
      }
    }
  }
}
</style>