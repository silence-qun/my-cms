import sRequst from './index'

export function getSongDetail(ids) {
  return sRequst.get('song/detail', { ids })
}

export function getSongLyric(id) {
  return sRequst.get('lyric', { id })
}
