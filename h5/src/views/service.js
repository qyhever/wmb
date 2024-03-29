import axios from 'axios'
import request from '@/utils/request.js'
const CancelToken = axios.CancelToken

export function getOrders () {
  return request({
    url: '/common/order'
  })
}

export function slowReq (loadingCallback, cancelCallback) {
  return request({
    method: 'get',
    url: '/common/slow',
    loading: false,
    loadingCallback,
    cancelToken: new CancelToken(cancelCallback)
  })
}

export function businessReq () {
  return request({
    method: 'post',
    url: '/common/businessErr'
  })
}

export function networkReq () {
  return request({
    method: 'post',
    url: '/common/networkErr'
  })
}

export function getFileReq () {
  return request({
    method: 'post',
    url: '/common/getFile',
    responseType: 'blob'
  })
}
