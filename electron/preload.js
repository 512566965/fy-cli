/*
 * @Description  : preload
 * @Author       : SC.beisu
 * @Date         : 2021-03-02 14:16:01
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-02 14:33:21
 * @FilePath     : /eletron/preload.js
 */
window.addEventListener('DomContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})