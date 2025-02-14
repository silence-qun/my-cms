/**
 * 节流函数
 * @param { Function } fn 需要执行的函数
 * @param { interval } 间隔时间
 * @param { options } 其它参数，如 leading（是否立即执行）、trailing（是否最后执行一次）
 * @returns Function
 */
function throttle(fn, interval = 300, options = { leading: true, trailing: false }) {
  const { leading, trailing, callback } = options

  let lastTime = 0
  let timer = null

  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (lastTime === 0 && !leading) lastTime = nowTime
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        const res = fn.apply(this, args)
        if (callback) callback(res)
        resolve(res)
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          if (callback) callback(res)
          resolve(res)
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
        }, remainTime)
      }
    })
  }

  // 取消功能
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}

export default throttle
