import sRequst from './index'

export function getBanners() {
  return sRequst.get('banner', { type: 2 })
}

// 获取所有榜单
export function getTopList() {
  return sRequst.get('toplist/detail')
}

// 根据榜单 id 获取歌单详情
export function getRankings(id) {
  return sRequst.get('playlist/detail', { id })
}

// 获取歌单
export function getSongMenu(cat = '全部', limit = 6, offset = 0) {
  return sRequst.get('top/playlist', { cat, limit, offset })
}
