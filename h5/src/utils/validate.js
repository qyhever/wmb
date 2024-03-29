/**
 * 正则验证
 */
/* eslint-disable */
export const RULE = {
  mobile: /^1[3456789][0-9]{9}$/,
  telMobile:/\d{3}-\d{8}|\d{4}-\d{7}|^1\d{10}$/,
  zh: /^[\u4E00-\u9FA5]+$/,
  password: /^(\w|\?=\.\*\[!@#\$%\^&\(\)\]){6,18}$/,
  integer: /^[1-9][0-9]*$/,
  // 两位小数
  numberTwoDecimal: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
  // 图形验证码
  imageVerifyCode: /^(\w|\d){4}$/,
  // 手机验证码
  phoneVerifyCode: /^\d{6}$/,
  cardVerifyCode: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  telVerifyCode: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/
}
/**
 * 验证字符串
 * @param {String} type 验证类型
 * @param {String} value 源字符串
 * @return {Boolean} 验证结果
 */
export function validator (type, value) {
  if (!RULE[type]) {
    throw new Error('Does not support the current type')
  }
  return RULE[type].test(value)
}
