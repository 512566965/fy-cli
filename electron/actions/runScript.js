/*
 * @Description  : 打包为zip
 * @Author       : SC.beisu
 * @Date         : 2021-03-29 10:35:39
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-01 08:14:38
 * @FilePath     : /fy-deploy-cli/electron/actions/runScript.js
 */
const fs = require('fs')
const ora = require('ora')
const childProcess = require('child_process')

const maxBuffer = 5000 * 1024
// 异步
module.exports = async (config, index) => {
  try {
    // const { script } = config
    const script = "pwd && cd ~/Desktop/program/fengyu/fy-deploy-cli/project && npm run build"
    // log(`(${index}) ${script}`)
    const spinner = ora('正在打包中\n')

    spinner.start()

    return await new Promise((resolve, reject) => {
      childProcess.exec(
        script,
        { cwd: process.cwd(), maxBuffer: maxBuffer },
        (e) => {
          console.log(e)
          spinner.stop()
          console.log(1111111111)
          if (e === null) {
            console.log(222222)
            resolve('打包成功')
          } else {
            spinner.stop()
            reject('打包失败')
          }
        }
      )
    })
  } catch (e) {
    // error('打包失败')
    // error(e)
    process.exit(1)
  }
}

