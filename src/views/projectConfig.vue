<!--
 * @Description  : 主内容
 * @Author       : SC.beisu
 * @Date         : 2021-03-05 08:25:36
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-02 10:44:30
 * @FilePath     : /fy-deploy-cli/src/views/projectConfig.vue
-->
<template>
  <div class="configs">
    <div class="title">
      <span>项目配置</span>
      <!-- <span><span>privateKey</span>:{{project['privateKey']}}</span> -->
    </div>
    <div class="config-content">
      <div class="config-content__item">
        <div class="config-content__item__title">
          <input :value="'fengyuBackstage'"/>
        </div>
        <div class="config-content__item__col"><span>项目路径:</span><input :value="projectConf.folder" readonly/><span>选择</span></div>
        <div class="config-content__item__col"><span>Baseurl:</span><input :value="projectConf.baseUrl"/></div>
        <div class="config-content__item__col"><span>打包路径:</span><input :value="projectConf.dist"/></div>
        <div class="config-content__item__col"><span>打包脚本:</span><input :value="projectConf.script"/></div>
        <div class="config-content__item__footer">
          <button @click="runScript">打包</button>
          <button @click="saveConf">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSync } from '@/utils/renderer'
import Sswitch from '@/components/switch'

export default {
  data () {
    return {
      projectConf: {
        folder: '',
        baseUrl: '',
        dist: '',
        script: ''
      }
    }
  },
  components: { Sswitch },
  mounted () {
    this.initData()
  },
  methods: {
    initData() {
      sendSync('getProjectConfigs').then( res => {
        this.projectConf = res
      })
    },
    saveConf () {
      sendSync('saveProjectConfig', this.projectConf).then( res => {
        console.log(res)
      })
    },
    runScript() {
      sendSync('runScript').then( res => {
        console.log(22222, res)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_conf.scss';
.configs {
  position: relative;
  display: flex;
  flex: auto;
  padding: 10px 20px;
  flex-direction: column;
  .title {
    flex: none;
    display: flex;
    justify-content: space-between;
  }
  .config-content {
    flex: auto;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    &__item {
      flex: 0 1 250px;
      padding: 10px 20px;
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      margin: 5px;
      &__title {
        & > input {
          border:transparent;
          font-size: 18px;
          color: #303133;
        }
      }
      &__col {
        & > input {
          border:transparent;
          color: #606266;
          font-size: 14px;
        }
        & > span {
          margin-right: 10px;
          color: #606266;
        }
        display: flex;
        line-height: 25px;
        height: 25px;
        vertical-align: center;
      }
      &__footer {
        display: flex;
        justify-content: flex-end;
        height: 20px;
        line-height: 20px;
        & > button {
          height: 25px;
          line-height: 20px;
          border: 1px solid #DCDFE6;
          border-radius: 8px;
          padding: 2px 15px;
          font-size: 14px;
          margin:2px 5px;
          color: #606266;
        }
      }
    }
  }
}
</style>