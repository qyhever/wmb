/**
 * 格式化枚举值
 * @param {Array} list 枚举值数组
 * @returns {Object} EnumAndArray {obj: {}, arr: []}
 */
function setEnumAndArray (list) {
  const obj = {}
  const arr = []
  list.forEach(item => {
    if (typeof item === 'object') {
      const label = item.v
      const value = item.k
      arr.push({ label, value })
      obj[value] = label
    }
  })
  return {
    obj,
    arr
  }
}

export const enumConfirmFlag = setEnumAndArray([
  { k: 'y', v: '是' },
  { k: 'n', v: '否' }
])
