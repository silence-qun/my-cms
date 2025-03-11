import sRequst from './index'

export function getSearchHot() {
  return sRequst.get('search/hot')
}

export function getSearchSuggest(keywords) {
  return sRequst.get('search/suggest', { keywords, type: 'mobile' })
}

export function getSearchResult(keywords) {
  return sRequst.get('search', { keywords })
}
