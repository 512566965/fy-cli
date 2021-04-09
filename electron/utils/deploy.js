/*
 * @Description  : delop工具类
 * @Author       : SC.beisu
 * @Date         : 2021-03-29 10:40:59
 * @LastEditors: Sc
 * @LastEditTime: 2021-04-09 14:38:38
 * @FilePath     : /fy-deploy-cli/electron/utils/deploy.js
 */
const fs = require('fs')
const ora = require('ora')
const archiver = require('archiver') // 压缩
const { NodeSSH } = require('node-ssh') // ssh连接
const childProcess = require('child_process')
const projectConf = require('../actions/getProjectConfigs')
const serverConf = require('../actions/getSeverConfigs')
const {error, succeed, loading, log, closeLoading} = require('../server/svr')

const ssh = new NodeSSH()
const maxBuffer = 5000 * 1024

// 任务列表
let taskList

// 检查环境是否正确
const checkEnvCorrect = (config, env) => {
  const keys = ['name', 'host', 'port', 'username', 'distPath', 'webDir']
  childProcess.exec(
    `cd ${config['folder']}`,
    { cwd: process.cwd(), maxBuffer: maxBuffer },
    (e) => {
      if (e === null) {
        // closeLoading('打包成功')
        // succeed('打包成功')
        // resolve()
      } else {
        // reject(e.message)
      }
    }
  )

  // if (config) {
  //   keys.forEach((key) => {
  //     if (!config[env][key] || config[env][key] === '/') {
  //       error(
  //         `配置错误: ${`${env}环境`} ${
  //           `${key}属性`
  //         } 配置不正确`
  //       )
  //       process.exit(1)
  //     }
  //   })
  // } else {
  //   error('配置错误: 未指定部署环境或指定部署环境不存在')
  //   process.exit(1)
  // }
}

// 执行打包脚本
const execBuild = async (config, index) => {
  try {
    // const script = "pwd && cd ~/Desktop/program/fengyu/fengyuBackstage && npm run build"

    // const script = `cd ${config['folder']} && ${config['script']}`
    const script = config['script']

    loading('正在打包中')

    await new Promise((resolve, reject) => {
      childProcess.exec(
        script,
        { cwd: process.cwd(), maxBuffer: maxBuffer },
        (e) => {
          if (e === null) {
            closeLoading('打包成功')
            succeed('打包成功')
            resolve()
          } else {
            reject(e.message)
          }
        }
      )
    })
  } catch (e) {
    error('打包失败')
    error(e)
    process.exit(1)
  }
}

// 压缩包tar
const buildZip = async (config, index) => {
  await new Promise((resolve, reject) => {
    log(`(${index}) 打包 ${config.distPath}.tar`)
    // zip格式压缩

    // const archive = archiver('zip', {
    //   zlib: { level: 9 }
    // }).on('error', (e) => {
    //   error(e)
    // })
    const archive = archiver('tar')

    const output = fs
      .createWriteStream(`${process.cwd()}/${config.distPath}.tar`)
      .on('close', (e) => {
        if (e) {
          error(`打包tar出错: ${e}`)
          reject(e)
          process.exit(1)
        } else {
          succeed(`${(`${config.distPath}.tar`)} 打包成功`)
          resolve()
        }
      })

    archive.pipe(output)
    archive.directory(config.distPath, false)
    archive.finalize()
  })
}

// 连接ssh
const connectSSH = async (config, index) => {
  try {
    log(`(${index}) ssh连接 ${(config.host)}`)

    const { privateKey, passphrase, password } = config
    if (!privateKey && !password) {
      // const answers = await inquirer.prompt([
      //   {
      //     type: 'password',
      //     name: 'password',
      //     message: '请输入服务器密码'
      //   }
      // ])
      error(`密钥或者服务器密码错误! `)
      // config.password = answers.password
    }

    !privateKey && delete config.privateKey
    !passphrase && delete config.passphrase

    await ssh.connect(config)
    succeed('ssh连接成功')
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

// 上传本地文件
const uploadLocalFile = async (config, index) => {
  try {
    const localFileName = `${config.distPath}.tar`
    const remoteFileName = `${config.webDir}.tar`
    const localPath = `${process.cwd()}/${localFileName}`

    log(`(${index}) 上传打包tar至目录 ${(remoteFileName)}`)

    const spinner = ora('正在上传中\n')

    spinner.start()

    await ssh.putFile(localPath, remoteFileName, null, {
      concurrency: 1
    })

    spinner.stop()
    succeed('上传成功')
  } catch (e) {
    error(`上传失败: ${e}`)
    process.exit(1)
  }
}

// 删除远程文件
const removeRemoteFile = async (config, index) => {
  try {
    const { webDir } = config

    log(`(${index}) 删除远程文件 ${(webDir)}`)

    await ssh.execCommand(`rm -rf ${webDir}`)

    succeed('删除成功')
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

// 解压远程文件
const unzipRemoteFile = async (config, index) => {
  try {
    const { webDir } = config
    const remoteFileName = `${webDir}.tar`

    log(`(${index}) 解压远程文件 ${(remoteFileName)}`)
    await ssh.execCommand(
      // `unzip -o ${remoteFileName} -d ${webDir} && rm -rf ${remoteFileName}`
      `tar -xvf ${remoteFileName} -C ${webDir}`
    )

    succeed('解压成功')
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

// 删除本地打包文件
const removeLocalFile = (config, index) => {
  const localPath = `${process.cwd()}/${config.distPath}`

  log(`(${index}) 删除本地打包目录 ${(localPath)}`)

  const remove = (path) => {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file) => {
        let currentPath = `${path}/${file}`
        if (fs.statSync(currentPath).isDirectory()) {
          remove(currentPath)
        } else {
          fs.unlinkSync(currentPath)
        }
      })
      fs.rmdirSync(path)
    }
  }

  remove(localPath)
  fs.unlinkSync(`${localPath}.tar`)
  succeed('删除本地打包目录成功')
}

// 断开ssh
const disconnectSSH = () => {
  ssh.dispose()
}

// 创建任务列表
const createTaskList = (config) => {
  const { script, isRemoveRemoteFile = false, isRemoveLocalFile = false } = config

  taskList = []
  script && taskList.push(execBuild)
  taskList.push(buildZip)
  taskList.push(connectSSH)
  taskList.push(uploadLocalFile)
  // isRemoveRemoteFile && taskList.push(removeRemoteFile)
  taskList.push(unzipRemoteFile)
  // isRemoveLocalFile && taskList.push(removeLocalFile)
  taskList.push(disconnectSSH)
}

// 执行任务列表
const executeTaskList = async (config) => {
  for (const [index, execute] of new Map(
    taskList.map((execute, index) => [index, execute])
  )) {
    await execute(config, index + 1)
  }
}


module.exports = {
  executeTaskList
  ,createTaskList
  ,disconnectSSH
  ,removeLocalFile
  ,unzipRemoteFile
  ,removeRemoteFile
  ,uploadLocalFile
  ,connectSSH
  ,buildZip
  ,execBuild
  ,checkEnvCorrect
}
