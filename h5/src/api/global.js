import request from '@/utils/request.js'

export function getUsers () {
  return request({
    method: 'get',
    url: '/users'
  })
}

export function sortUser (data) {
  return request({
    method: 'post',
    url: '/userSort',
    data
  })
}
