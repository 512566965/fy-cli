/*
 * @Description  : 获取用户hosts
 * @Author       : SC.beisu
 * @Date         : 2021-03-08 11:00:40
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-30 16:36:43
 * @FilePath     : /fy-deploy-cli/electron/actions/getUserHost.js
 */
const io = require('../utils/io')
const { data_path } = require('../utils/paths')

module.exports = () => {
  return io.pReadFile(data_path)
  .then(cnt => {
    let data
    try {
      data = JSON.parse(cnt)
    } catch (e) {
      data = {}
    }
    return data
  })
  .then(data => {
    if (!Array.isArray(data.list)) {
      data.list = []
    }
    return data.list
  })
  .then(list => {
    let ids = {}
    return list.map(item => {
      if (!item.id || ids.hasOwnProperty(item.id)) {
        // item.id = makeId()
        console.log(1111111, item)
      }
      ids[item.id] = 1
      return item
    })
  })
}