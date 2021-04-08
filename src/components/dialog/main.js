/*
 * @Description  : dialogBox
 * @Author       : SC.beisu
 * @Date         : 2021-04-07 09:31:40
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-04-08 14:19:53
 * @FilePath     : /fy-deploy-cli/src/components/dialog/main.js
 */
import Vue from 'vue'
import DialogVue from './index.vue'

const defaults = {
  visible: false,
  title: undefined,
  message: '',
  showConfirmButton: true,
  confirmButtonText: '',
  showCancelButton: true,
  cancelButtonText: '',
  callback: null
}
const DialogBoxConstructor = Vue.extend(DialogVue)
DialogBoxConstructor.prototype.close = function() {
  // this.$destroy()
  this.visible = false
}

let instance, currentMsg
let msgQueue = []

const initInstance = () => {
  instance = new DialogBoxConstructor({
    el: document.createElement('div')
  })
  instance.callback = defaultCallback
}

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action);
      }
    }
  }
};

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      let options = currentMsg.options;
      for (let prop in options) {
        if (instance.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      };

      // if (isVNode(instance.message)) {
      //   instance.$slots.default = [instance.message];
      //   instance.message = null;
      // } else {
      //   delete instance.$slots.default;
      // }
      // ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
      //   if (instance[prop] === undefined) {
      //     instance[prop] = true;
      //   }
      // });
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};

const DialogBox = function (options, callback) {
  if  (typeof options === 'string') {
    options = {
      message: options
    }
  }
  if (typeof arguments[1]) {
    
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: options,
        callback: callback,
        resolve: resolve,
        reject: reject
      })
      showNextMsg()
    })
  } else {
    // ...
  }
}

DialogBox.close = function () {
  if(!instance) initInstance()
  // console.log(instance.$destroy)
  instance.close()
}

export default DialogBox
// export { DialogBox }