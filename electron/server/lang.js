/*
 * @Description  : 多语言
 * @Author       : SC.beisu
 * @Date         : 2021-03-04 11:10:16
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-04 11:16:53
 * @FilePath     : /fy-deploy-cli/src/electron/server/lang.js
 */
'use strict'

const languages = {
  'en': require('../lang/en').content,
  'cn': require('../lang/cn').content,
  'ja': require('../lang/ja').content
}

module.exports = {
  languages: languages,
  lang_list : (() => {
    let list = []
    for (let k in languages) {
      if (languages.hasOwnProperty(k)) {
        list.push({
          key: k,
          name: languages[k]._lang_name
        })
      }
    }
    return list
  })(),
  getLang: (lang) => {
    lang = lang.toLowerCase()
    if (lang === 'cn' || lang === 'zh-cn') {
      lang = 'cn'
    } else if (lang === 'ja') {
      lang = 'ja'
    } else {
      lang = 'en'
    }
    return languages[lang] || languages['en']
  },
  fill: (tpl, ...vals) => {
    vals.map((v, idx) => {
      let r = new RegExp('\\$\\{' + idx + '\\}', 'g')
      tpl = tpl.replace(r, v)
    })
    return tpl
  }
}