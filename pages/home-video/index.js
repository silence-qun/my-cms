// pages/home-video/index.js
import { getTopMVs } from '../../service/api_video'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getTopMVData(0)
  },

  async getTopMVData(offset) {
    if (!this.data.hasMore && offset !== 0) return

    wx.showNavigationBarLoading()

    const res = await getTopMVs(offset)
    let newData = this.data.topMVs
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }
    this.setData({ topMVs: newData, hasMore: res.hasMore })

    wx.hideNavigationBarLoading()
  },

  handleVideoItemClick(event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({ url: `/packageDetail/pages/detail-video/index?id=${id}` })
  },

  async onPullDownRefresh() {
    await this.getTopMVData(0)
    wx.stopPullDownRefresh()
  },

  onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  },
})
