import sRequst from './index'

export function getTopMVs(offset, limit = 10) {
  return sRequst.get('top/mv', { offset, limit })
}
