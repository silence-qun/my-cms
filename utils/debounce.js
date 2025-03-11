/**
 * 防抖函数
 * @param { Function } fn 需要执行的函数
 * @param { number } delay 延迟时间，单位为 s
 * @param { boolean } immediate 立即执行，每次触发先执行一次
 * @param { Function } callback 用来获取返回值
 * @returns Function
 */

function debounce(fn, delay = 500, immediate = false, callback) {
  let timer = null
  // 保证每次重新输入时都会立即执行
  let isInvoke = false

  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)

      if (immediate && !isInvoke) {
        const res = fn.apply(this, args)
        if (callback) callback(res)
        resolve(res)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          if (callback) callback(res)
          resolve(res)
          timer = null
          isInvoke = false
        }, delay)
      }
    })
  }

  // 取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

export default debounce
