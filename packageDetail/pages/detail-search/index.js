// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../../service/api_search'
import debounce from '../../../utils/debounce'
import string2nodes from '../../../utils/string2nodes'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData()
  },

  getPageData: function () {
    getSearchHot().then((res) => {
      this.setData({ hotKeywords: res.result?.hots || [] })
    })
  },

  handleSearchChange: function (event) {
    const searchValue = event.detail
    this.setData({ searchValue })
    if (!searchValue) {
      this.setData({ suggestSongs: [], resultSongs: [] })
      // 快速删除输入框内容时，防止会出现 searchValue 为空，却有搜索建议结果的情况
      debounceGetSearchSuggest.cancel()
      return
    }
    debounceGetSearchSuggest(searchValue).then((res) => {
      const suggestSongs = res.result?.allMatch || []
      this.setData({ suggestSongs })

      const suggestKeywords = suggestSongs.map((item) => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = string2nodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  handleSearchAction: function () {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then((res) => {
      this.setData({ resultSongs: res.result?.songs || [] })
    })
  },
  handleKeywordItemClick: function (event) {
    const keyword = event.currentTarget.dataset.keyword

    this.setData({ searchValue: keyword })

    this.handleSearchAction()
  },
})
