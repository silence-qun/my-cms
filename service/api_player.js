import sRequst from './index'

export function getSongDetail(ids) {
  return sRequst.get('song/detail', { ids })
}
