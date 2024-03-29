/**
 * 封装 axios 请求
 */
import axios from 'axios'
import qs from 'qs'
import { MessagePlugin } from 'tdesign-vue-next'
// import JSONbig from 'json-bigint'

export const baseURL = {
  dev: 'http://localhost:5000',
  test: '/api',
  prod: '/api'
}[import.meta.env.VITE_APP_MODE]

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '禁止访问',
  404: '请求地址不存在',
  500: '服务器繁忙，请稍后再试',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const instance = axios.create({
  baseURL,
  timeout: 15000,
  // 只作用于 params（手动拼接在 url 后的参数不走这里）
  paramsSerializer: {
    serialize
  }
  // transformResponse: [function (data) {
  //   if (data) {
  //     try {
  //       return JSONbig({ storeAsString: true }).parse(data)
  //       // return data
  //     } catch (error) {
  //       return data
  //     }
  //   }
  //   return data
  // }]
})

/**
 * 过滤空参数
 * @param {Object} params 参数对象
 * @return {String} &符号拼接的参数字符串
 */
function serialize (params) {
  const data = {}
  Object.keys(params).forEach(k => {
    const value = params[k]
    // value !== '' &&
    if (value !== null && value !== undefined) {
      data[k] = value
    }
  })
  return qs.stringify(data)
}

function handleRequestHeader (configHeaders) {
  const headers = {
    ...(configHeaders || {}),
    'X-Requested-With': 'XMLHttpRequest'
  }
  // 开发环境下的请求头
  if (import.meta.env.VITE_APP_MODE === 'dev') {
    // Object.assign(headers, {})
  }
  return headers
}

function handleRequestParams (configParams) {
  const params = {
    ...(configParams || {}),
    t: new Date().getTime() // 避免缓存
  }
  return params
}

function getErrorMsg (error) {
  let msg = ''
  // http 错误响应
  if (error.response) {
    const { status } = error.response
    return codeMessage[status]
  }
  // 超时或断网
  if (error.message.includes('timeout')) {
    msg = '请求超时！请检查网络是否正常'
  } else {
    msg = '请求异常！'
  }
  return msg
}

function handleErrorStatus (status, data) {
  console.log('handleErrorStatus data: ', data)
  if (status === 401) {
    // router.replace('/unauthorized')
  }
}

// 请求之前
function requestStart (config, loadingCallback) {
  loadingCallback(true)
  const headers = handleRequestHeader(config.headers)
  const params = handleRequestParams(config.params)
  return {
    ...config,
    headers,
    params
  }
}

// 响应正常
// {
//   code: '200',
//   data: [],
//   msg: '查询成功'
// }
function requestThenEnd ({ url, response, origin, loadingCallback, showWarning, warningMsg }) {
  loadingCallback(false)
  const responseData = response.data
  if (response.config.responseType === 'blob') {
    return response // 返回 axios 源数据，可能需要获取 headers 信息
  }
  // 返回接口源数据，调用处自行处理业务状态逻辑
  if (origin) {
    return responseData
  }
  // success code
  if (responseData.success) {
    return [null, responseData.data]
  }
  // not success code
  if (showWarning) {
    MessagePlugin.closeAll()
    MessagePlugin.warning(warningMsg || responseData.msg || '操作失败')
  }
  // 抛出业务错误
  const err = new Error(JSON.stringify(responseData, null, 2))
  err.name = 'warning'
  err.response = responseData
  console.log('------业务抛出异常-----', err)
  return [err, responseData]
}

// 响应异常
function requestCatchEnd ({ error, loadingCallback, showError, errorMsg, reqConf }) {
  loadingCallback(false)
  if (axios.isCancel(error)) {
    // 取消请求的错误，直接跳过
    // return genEmptyPromise()
    return [error, null]
  }
  const msg = errorMsg || getErrorMsg(error)
  if (showError) {
    MessagePlugin.closeAll()
    MessagePlugin.error(reqConf.url + ' 接口异常，' + msg)
  }
  if (error.response) {
    const { status, data } = error.response
    handleErrorStatus(status, data)
  }
  console.log('------请求异常------', error)
  return [error, null]
}

/**
 * 发起 ajax 请求
 * @param {Object} options 请求配置参数
 * @param {Boolean} [options.origin=false] 是否返回响应源数据（默认否，即返回源数据中的 data 字段）
 * @param {Boolean} [options.showWarning=true] 是否显示业务错误提示（请求成功，但业务状态码非成功状态）
 * @param {Boolean} [options.showError=true] 是否显示http错误提示（http请求失败）
 * @param {Boolean} [options.loading=true] 是否显示 loading
 * @param {Function} [options.loadingCallback=()=>{}] loading 状态回调
 * @param {String} [options.warningMsg=''] 业务错误提示
 * @param {String} [options.errorMsg=''] http请求错误提示
 * @return {Promise} Promise
 */
const request = async (options = {}) => {
  const {
    origin = false,
    showWarning = true,
    showError = true,
    loading = true,
    loadingCallback = () => { }, // eslint-disable-line
    warningMsg = '',
    errorMsg = '',
    ...restOptions
  } = options
  const { method, url, params, data } = restOptions
  const reqConf = { method, url, params, data }
  const config = requestStart(restOptions, loadingCallback, loading)
  try {
    const response = await instance(config)
    return requestThenEnd({
      url,
      response,
      origin,
      loadingCallback,
      showWarning,
      warningMsg,
      loading
    })
  } catch (error) {
    return requestCatchEnd({
      error,
      loadingCallback,
      showError,
      errorMsg,
      loading,
      reqConf
    })
  }
}
export default request
