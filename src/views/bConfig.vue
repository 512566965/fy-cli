<!--
 * @Description  : 主内容
 * @Author       : SC.beisu
 * @Date         : 2021-03-05 08:25:36
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 10:33:57
 * @FilePath     : /fy-deploy-cli/src/views/Bconfig.vue
-->
<template>
  <div class="configs">
    <div class="title">
      <span>{{project['projectName']}}服务器配置</span>
    </div>
    <div class="config-content">
      <div v-for="(item, i) in configs" :key="i" class="config-content__item">
        <div class="config-content__item__title">
          <input v-model="item.name"/>
        </div>
        <div class="config-content__item__col"><span>host:</span><input v-model="item.host"/></div>
        <div class="config-content__item__col"><span>port:</span><input v-model="item.port"/></div>
        <div class="config-content__item__col"><span>username:</span><input v-model="item.username"/></div>
        <div class="config-content__item__col">
          <span>password:</span>
          <input
            :value="item.password"
            @change="handleChangePwd(i)"
            @blur="inputFocus = ''"
            @focus="inputFocus = 'password'"
          />
        </div>
        <div class="config-content__item__col"><span>webDir:</span><input :value="item.webDir" /></div>
        <div class="config-content__item__col"><span>是否删除本地打包文件:</span><Sswitch v-model="item.isRemoveLocalFile"/></div>
        <div class="config-content__item__col"><span>是否删除远程打包文件:</span><Sswitch v-model="item.isRemoveRemoteFile" /></div>
        <div class="config-content__item__col"><span>打包路径:</span><input :value="item.distPath"/></div>
        <div class="config-content__item__col"><span>打包脚本:</span><input :value="item.script"/></div>
        <div class="config-content__item__footer">
          <button @click="saveConfig(i)">保存</button>
          <button @click="deploy">上传</button>
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
      project: {
        projectName: '',
        privateKey: ''
      },
      configs: {},
      inputFocus: ''
    }
  },
  filters: {
    password: function (val) {
      return val.replace(/.+/, '******')
    }
  },
  components: { Sswitch },
  mounted () {
    sendSync('getSeverConfigs').then( result => {
      let {projectName, privateKey, dev, prod, test} = result
      this.project = { projectName, privateKey }
      this.configs ={dev, prod, test}
    })
  },
  methods: {
    changeValue (val) {
    },
    handleChangePwd (e) {

    },
    saveConfig(i) {
      let arg = {}
      arg[i] = this.configs[i]
      sendSync('saveSeverConfig', arg).then( res => {
        console.log(22222, res)
      })
    },
    deploy () {
      sendSync('deploy').then( res => {
        // console.log(22222, res)
      })
    }
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