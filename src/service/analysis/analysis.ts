import service from '..'
import type { IGoods } from './types'

enum AnalysisAPI {
  Goods = '/goods'
}

export function goodsRe() {
  return service.request<IGoods>({
    url: AnalysisAPI.Goods
  })
}
