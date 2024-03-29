import { isUndefined, isBlob } from '@/utils/type'

export const EMPTY_IDENTIFIER = '-'

export function fillEmptyText (val) {
  if (val === '' || isUndefined(val) || val === null) {
    return EMPTY_IDENTIFIER
  }
  return val
}

export function makeTree (treeNodes, key = 'id', parentKey = 'parentId') {
  // Map<number|string, TreeNode>
  const nodesMap = new Map(
    treeNodes.map(node => [node[key], node])
  )

  const virtualRoot = {}
  treeNodes.forEach(node => {
    const parent = nodesMap.get(node[parentKey]) || virtualRoot
    if (!parent.children) {
      parent.children = []
    }
    parent.children.push(node)
  })
  return virtualRoot.children || []
}

// 树状结构（多维数组）扁平化
export function flatten (arr, childKey) {
  let ret = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const child = childKey ? item[childKey] : item // 默认数组嵌套数组
    if (Array.isArray(child)) {
      ret = ret.concat(flatten(child, childKey))
    }
    ret.push(item)
  }
  return ret
}
export function genGuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const downloadFile = (function () {
  if (navigator.msSaveOrOpenBlob) {
    return function (file, name) {
      window.navigator.msSaveOrOpenBlob(file, name)
    }
  }
  return function (file, name) {
    const url = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }
})()

export function getFileNameByContentDisposition (cd) {
  // return (decodeURIComponent(cd).split('filename=')[1] || '').replace(/"|'/g, '')
  const result = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(decodeURIComponent(cd))
  if (result && result[0]) {
    return result[0].replace('filename=', '')
  }
  return ''
}

// 下载模板文件（接受一个Promise格式的api请求，要求返回源数据response，因为要读取headers里面的文件名）
export function downloadFileByApi (api) {
  return api().then(res => {
    const blob = res.data
    const fileName = getFileNameByContentDisposition(res.headers['content-disposition']) || genGuid()
    if (!blob || !isBlob(blob)) {
      return [true] // fail
    }
    downloadFile(blob, fileName)
    return [null] // success
  }).catch(err => {
    console.log('err: ', err)
    return [err] // fail
  })
}

// 数字千分位
export function formatMoney (val) {
  if (!val) {
    return ''
  }
  return (val + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
}

/**
 * 阿拉伯数字转中文数字
 * @param {Number} num 阿拉伯数字
 * @return {String} 中文数字
 */
export function arabicNumToCnNum (num) {
  if (num === 10) {
    return '十'
  }
  const changeNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  const getCh = temp => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (let i = 0; i < strArr.length; i++) {
      newNum = (i === 0 && strArr[i] === '0' ? '' : (i > 0 && strArr[i] === '0' && strArr[i - 1] === '0' ? '' : (i === strArr.length - 1 && strArr.length === 2 && strArr[i] === '1' ? '' : changeNum[strArr[i]]) + (strArr[i] === '0' ? unit[0] : unit[i]))) + newNum
    }
    return newNum
  }
  const ny = Math.floor(num / 100000000)
  num = ny ? (num - ny * 100000000) : num
  const nw = Math.floor(num / 10000)
  num = nw ? (num - nw * 10000) : num
  return ny ? getCh(ny) + '亿' + getCh(nw) + '万' + getCh(num) : nw ? getCh(nw) + '万' + getCh(num) : getCh(num)
}

// 四舍五入保留n位小数，整数返回整数
export function keepDecimal (num, n = 2) {
  const len = Math.pow(10, n)
  return Math.round(num * len) / len
}

// 四舍五入保留1位小数，整数返回整数
export function keepOneDecimal (num) {
  // Math.round(2.444 * 10) / 10 -> 2.4
  return Math.round(num * 10) / 10
}

// 四舍五入保留2位小数，整数返回整数
export function keepTwoDecimal (num) {
  // Math.round(2.444 * 100) / 100 -> 2.44
  return Math.round(num * 100) / 100
}

// 四舍五入保留2位小数，小数位不够补0（PS: 返回字符串）
export function paddingTwoDecimal (num) {
  const count = keepTwoDecimal(num)
  const nums = String(count).split('.')
  if (nums.length === 1) { // 只有整数部分
    return String(count) + '.00'
  }
  if (nums[1] && nums[1].length === 1) { // 小数部分只有一位
    return String(count) + '0'
  }
  return count
}

// toFixed 修复版： 修复 1.335.toFixed(2) => 1.33
export function toFixed (val, s = 2) {
  const num = val || 0
  if (/^\d+$/.test(String(num))) { // 整数
    return num.toFixed(s)
  }
  const times = Math.pow(10, s)
  let des = num * times + 0.5
  des = parseInt(des, 10) / times
  return des + ''
}

export function formatKWNum (value) {
  if (value >= 1000 && value < 10000) {
    return toFixed(value / 1000, 1) + 'k'
  }
  if (value >= 10000) {
    return toFixed(value / 10000, 1) + 'w'
  }
  return value
}

/**
 * 排序比较函数
 * @param {String|Null} field 数组项为对象时，按哪个属性排序（传 null 直接按数组项排序）
 * @param {Boolean} [asc=true] 是否升序，默认升序
 * @returns compareFn
 */
export function sortCompare (field, asc) {
  let sortValue = -1 // 默认升序
  if (typeof asc !== 'undefined') {
    sortValue = asc ? -1 : 1
  }
  return function (prev, next) {
    const a = field ? prev[field] : prev
    const b = field ? next[field] : next
    return a < b ? sortValue : a > b ? sortValue * -1 : 0
  }
}
