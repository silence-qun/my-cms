// pages/music-player/index.js
import { getSongDetail } from '../../service/api_player'
import { audioContext } from '../../store/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentSong: {},
    durationTime: 0,
    currentTime: 0,
    currentPage: 0,
    contentHeight: 0,
    isMusicLyric: true,
    sliderValue: 0,
    isSliderChanging: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({ id })

    this.getPageData(id)

    const { screenHeight, statusBarHeight, navBarHeight, deviceRadio } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })

    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.volume = 0.3
    // autoplay 和 play() 不能同时设置，会导致音频无法通过 pause/stop 等方法暂停/停止
    // audioContext.autoplay = true
    audioContext.onCanplay(() => {
      audioContext.play()
    })
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging) {
        const currentTime = audioContext.currentTime * 1000
        const sliderValue = (currentTime / this.data.durationTime) * 100
        this.setData({ currentTime, sliderValue })
      }
    })
  },

  getPageData: function (id) {
    getSongDetail(id).then((res) => {
      this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
    })
  },

  handleSwiperChange: function (event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },

  handleSliderChange: function (event) {
    const value = event.detail.value
    const currentTime = (this.data.durationTime * value) / 100

    audioContext.pause()
    // InnerAudioContext.seek(number position) 跳转的时间，单位 s
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, isSliderChanging: false })
  },

  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = (this.data.durationTime * value) / 100
    this.setData({ isSliderChanging: true, currentTime })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
})
