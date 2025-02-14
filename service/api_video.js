import sRequst from './index'

/**
 * 获取 mv 排行
 * @param {number} offset 偏移数量 , 用于分页
 * @param {number} limit 取出数量
 */
export function getTopMVs(offset, limit = 10) {
  return sRequst.get('top/mv', { offset, limit })
}

/**
 * 获取 mv 播放地址
 * @param {number} id mv id
 */
export function getMVURL(id) {
  return sRequst.get('mv/url', { id })
}

/**
 * 获取对应 MV 数据
 * @param {number} mvid mv 的 id
 */
export function getMVDetail(mvid) {
  return sRequst.get('mv/detail', { mvid })
}

/**
 * 获取相关视频
 * @param {number} id 视频 的 id
 */
export function getRelatedVideo(id) {
  return sRequst.get('related/allvideo', { id })
}

/**
 * 获取推荐视频 - 需要登陆
 * @param {number} id 视频 的 id
 */
export function getRecommendVideo(offset = 10) {
  return sRequst.get('video/timeline/recommend', { offset })
}
