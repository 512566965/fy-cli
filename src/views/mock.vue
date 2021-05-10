<!--
 * @Description  : mock页面
 * @Author       : SC.beisu
 * @Date         : 2021-04-02 11:03:39
 * @LastEditors: Sc
 * @LastEditTime: 2021-05-10 08:53:00
 * @FilePath     : /fy-deploy-cli/src/views/mock.vue
-->
<template>
<div>
  <div @click="handleClick('succeed')">succeed</div>
  <div @click="handleClick('warning')">warning</div>
  <div @click="handleClick('error')">error</div>
  <div @click="handleClick('info')">info</div>
  <div @click="handleClick('loading')">loading</div>
  <div @click="handleClose('')" >销毁</div>
  <div @click="handleRun()">Generator</div>
  <div @click="testMyPromise()">promise</div>
</div>
</template>
<script>
import MyPromise from '@/utils/MyPromise.js'
export default {
  methods: {
    handleClick (type) {
      this.$dialog({type: type, message: '正在打包中...', title: '提示'}).then(res => {
      }).catch(e => console.log(e))
    },
    handleClose() {
      this.$dialog.close()
    },
    run (gen, ...arg) {
      const g = gen(1)
      function next(gen, ...arg) {
        new Promise ((resolve, reject) => {
          try {
            var result = g.next()
            console.log(result)
          }catch (e){
            reject(e)
          }
          if (result.done) return
          if (typeof result.value.then === 'function') {
            result.value.then(data => {
              return data
            }).then(() => {
              next()
            })
          } else {
            result.value(next)
          }
        })
      }
      next()
    },
    handleRun () {
      function callbackFun (x) {
        return function (cb) {
          setTimeout(function () {
            return x+=100
            cb()
          }, 1000)
        }
      }

      function promiseFun (x) {
        return new Promise ((resolve, reject) => {
          resolve(x += 10)
        })
      }
      function* test (x) {
        // var a = yield x + 100
        yield promiseFun(x)
        console.log('a')
        var b = yield promiseFun(x)
        console.log('b', b)
        var c = yield promiseFun(x)
        console.log('c', c)
      }
      console.log('handleRun')
      this.run(test, 3)

    },
    testMyPromise () {
      console.log('MyPromise')
      // function other () {
      //   return new MyPromise((resolve, reject) =>{
      //     resolve('other')
      //   })
      // }
      // var promise = new MyPromise((res, rej) => {
      //   res('succeed')
      //   // rej('failed')
      //   // throw new Error('执行器错误')
      // })
      // console.log('000000')
      // // promise.then(value=> {
      // //   console.log(value, 11111)
      // //   // throw new Error('then error')
      // //   return promise
      // // }, e => console.log(e))
      // // .then(value=> console.log(value, 2222), e => console.warn(e))
      // promise.then().then(value=> console.log(value, 2222), e => console.warn(e))
      // // .catch(e => console.log(e))
       MyPromise.resolve().then(() => {
        console.log(0);
        return MyPromise.resolve(4);
      }).then((res) => {
        console.log(res)
      })

      MyPromise.resolve().then(() => {
        console.log(1);
      }).then(() => {
        console.log(2);
      }).then(() => {
        console.log(3);
      }).then(() => {
        console.log(5);
      }).then(() =>{
        console.log(6);
      })
      console.log('macroTasks finshed')

      console.log(1111)
      const p2 = new Promise((res, rej) => {
        console.log(22222)
        res(222222)
      })
      // Promise.resolve().then(() => {
      //   console.log(2222)
      //   setTimeout(() => {
      //     console.log(7777)
      //   }, 0);
      //   Promise.resolve().then(() => {
      //     console.log(44444)
      //   })
      //   setTimeout(() => {
      //     console.log(6666)
      //   }, 0);
      //   console.log(55555)
      // })

      Promise.resolve()
      .then(() => {
        console.log(0)
        return Promise.resolve(4)
      })
      .then(res => {
        console.log(res)
      })
      Promise.resolve()
      .then(() => {
        console.log('a')
        var p1 = new Promise((res, rej) => {
          console.log('b')
          res('c')
        })
        return p1.then(value => {
          console.log('ffff', value)
          return value
        })
      })
      .then(res => {
        console.log('``````')
        console.log(res)
      })

      Promise.resolve()
      .then(() => {
        console.log(1)
      })
      .then(() => {
        console.log(2)
      })
      .then(() => {
        console.log(3)
      })
      .then(() => {
        console.log(5)
      })
      .then(() => {
        console.log(6)
      })

      console.log('macroTasks start')
      new Promise(resolve => {
        let resolvedPromise = Promise.resolve()
        console.log('new Promise', resolvedPromise)
        resolve(resolvedPromise)
        // resolve('resolvedPromise')
      }).then(res => {
        console.log('resolvePromise resolved', res)
      })

      Promise.resolve().then(() => { console.log('promise1') })
      .then(() => { console.log('promise2') })
      .then(() => { console.log('promise3') })

      Promise.resolve().then(() => {
        console.log(0)
        let resolvePromise = Promise.resolve(4)
        return resolvePromise
      }).then(res => {
        console.log(res)
      })
      console.log('macroTasks end')
      // ----------------macroTasks
      // macroTasks start
      // new Promise
      // macroTasks end
      // ----------------microTasks
      // promise1
      // 0
      // promise 2

    }
  }
}
</script>
