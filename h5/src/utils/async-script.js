/**
 * 动态加载 js 文件
 * @param {String} src js 路径
 * @param {Any} existVariable 加载 js 后在全局作用域生成的变量（根据此变量决定判断是否进行加载）
 * @param {Function} callback 加载 js 后的回调函数（第一个参数 err 用来判断是否加载成功）
 */
const callbacks = []
export function asyncLoadScript (src, existVariable, callback) {
  const existingScript = document.getElementById(src)
   const cb = callback || function() {} // eslint-disable-line

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }

  if (existingScript && cb) {
    if (existVariable) {
      cb(null, existingScript)
    } else {
      callbacks.push(cb)
    }
  }

  function stdOnEnd (script) {
    script.onload = function () {
      // because even IE9 works not like others
      this.onerror = this.onload = null
      callbacks.forEach(cb => cb(null, script))
      callbacks.length = 0
    }
    script.onerror = function () {
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd (script) {
    script.onreadystatechange = function () {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      // there is no way to catch loading errors in IE8
      callbacks.forEach(cb => cb(null, script))
      callbacks.length = 0
    }
  }
}
