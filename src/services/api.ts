import http from './http'

export const register = (data = {}) => {
  return http.post('register', data)
}

export const login = (data = {}) => {
  return http.post('login', data)
}

export const getUserList = (data = {}) => {
  return http.get('user/list', data)
}

// 删除用户
export const deleteUserById = (data = {}) => {
  return http.delete('user/delete', data)
}

// 创建文章
export const createArticle = (data = {}) => {
  return http.post('article/create', data)
}

// 获取文章列表
export const getArticleList = (data = {}) => {
  return http.get('article/list', data)
}

// 获取文章详情
export const getArticleById = (data = {}) => {
  return http.get('article/detail', data)
}

// 删除文章
export const deleteArticleById = (data = {}) => {
  return http.delete('article/delete', data)
}

// 更新文章
export const updateArticle = (data = {}) => {
  return http.put('article/update', data)
}

// 获取标签列表
export const getTagList = (data = {}) => {
  return http.get('tag/list', data)
}

// 对文章发表评论
export const publishComment = (data = {}) => {
  return http.post('discuss/publish', data)
}

// 删除评论
export const deleteComment = (data = {}) => {
  return http.delete('discuss/delete', data)
}

// 回复评论或者回复给回复
export const replyComment = (data = {}) => {
  return http.post('discuss/reply', data)
}

// 删除回复
export const deleteReply = (data = {}) => {
  return http.delete('discuss/reply/delete', data)
}

// 获取七牛上传ak和sk
// export const getQiniuToken = (data = {}) => {
//   return http.get('qiniu/token', data)
// }
