// pages/detail-songs/index.js
import { rankingStore } from '../../store/index'
import { getRankings } from '../../service/api_music'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    ranking: '',
    songInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if (type === 'menu') {
      const id = options.id
      getRankings(id).then((res) => {
        this.setData({ songInfo: res.playlist })
      })
    } else if (type === 'rank') {
      const ranking = options.ranking
      this.setData({ ranking })
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.data.ranking && rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
  },

  getRankingDataHandler: function (res) {
    this.setData({ songInfo: res })
  },
})
