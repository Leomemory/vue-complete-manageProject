import axios from '../axios'

//获取用户列表
export const getUserListPage = params => {
  return axios({
    url: '/user/listpage',
    method: 'get',
    params: params
  })
}

//批量删除用户
export const batchRemoveUser = params => {
  return axios({
    url: '/user/batchremove',
    method: 'get',
    params: params
  })
}

//删除单个用户
export const removeUser = params => {
  return axios({
    url: '/user/remove',
    method: 'get',
    params: params
  })
}
export const editUser = params => {
  return axios({
    url: '/user/edit',
    method: 'get',
    params: params
  })
}
export const addUser = params => {
  return axios({
    url: '/user/add',
    method: 'get',
    params: params
  })
}
