/*
 * @Description  : ssh上传功能
 * @Author       : SC.beisu
 * @Date         : 2021-03-29 10:39:56
 * @LastEditors: Sc
 * @LastEditTime: 2021-04-09 14:40:45
 * @FilePath     : /fy-deploy-cli/electron/actions/deploy.js
 */
const {
  executeTaskList
  ,createTaskList
  ,checkEnvCorrect
} = require('../utils/deploy')

module.exports = () => {
  return Promise.all([require('./getSeverConfigs')(), require('./getProjectConfigs')()]).then(res => {
    const currentTime = new Date().getTime()
    const envConfig = Object.assign(res[0]['test'], {
      passphrase: res[0].passphrase
    }, res[1])
    checkEnvCorrect(envConfig)
    createTaskList(envConfig)
    return executeTaskList(envConfig)
  }).catch(e => {
    console.log(e)
  })
}

  // return async() => {
  //   if (checkDeployConfigExists()) {
  //     // const config = require(deployConfigPath)

  //     // const createdEnvConfig = (env) => {
  //     //   checkEnvCorrect(config, env)

  //     //   return Object.assign(config[env], {
  //     //     privateKey: config.privateKey,
  //     //     passphrase: config.passphrase
  //     //   })
  //     // }
  //     let env = true

  //     if (env) {
  //       // const envConfig = createdEnvConfig(env)

  //       // succeed(
  //       //   `恭喜您，${underline(projectName)}项目已在${underline(
  //       //     envConfig.name
  //       //   )}部署成功 耗时${(new Date().getTime() - currentTime) / 1000}s\n`
  //       // )
  //       process.exit(0)
  //     } else if (cluster && cluster.length > 0) {
  //       const answers = await confirmDeploy(
  //         `${underline(projectName)} 项目是否部署到 ${underline('集群环境')}?`
  //       )

  //       if (answers.confirm) {
  //         for (const env of cluster) {
  //           const envConfig = createdEnvConfig(env)

  //           createTaskList(envConfig)

  //           await executeTaskList(envConfig)

  //           succeed(
  //             `恭喜您，${underline(projectName)}项目已在${underline(
  //               envConfig.name
  //             )}部署成功`
  //           )
  //         }

  //         succeed(
  //           `恭喜您，${underline(projectName)}项目已在${underline(
  //             '集群环境'
  //           )}部署成功 耗时${(new Date().getTime() - currentTime) / 1000}s\n`
  //         )
  //       } else {
  //         process.exit(1)
  //       }
  //     } else {
  //       error(
  //         '请使用 deploy-cli-service -mode 指定部署环境或在配置文件中指定 cluster（集群）地址'
  //       )
  //       process.exit(1)
  //     }
  //   } else {
  //     console.log(deployConfigPath)
  //     error(
  //       'deploy.config.js 文件不存' + deployConfigPath
  //     )
  //     process.exit(1)
  //   }
  // }
  // }