// pages/home-music/index.js
import { rankingStore, playerStore } from '../../store/index'
import { getBanners, getSongMenu } from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,
    banners: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    recommendSongs: [],
    rankings: { newRanking: {}, originRanking: {}, upRanking: {} },
    currentSong: {},
    isPlaying: false,
    playAnimState: 'paused'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 获取页面数据
    this.getPageData()

    // 发起共享数据的请求
    rankingStore.dispatch('getRankingDataAction')

    // 从 store 中获取共享数据
    this.setupPlayerStoreListener()
  },

  getPageData() {
    getBanners().then((res) => {
      // setData 在设置 data 数据上，是同步的
      // 通过最新的数据对 wxml 进行渲染，是异步的
      // setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
      this.setData({ banners: res.banners })
    })

    getSongMenu().then((res) => {
      this.setData({ hotSongMenu: res.playlists })
    })
    getSongMenu('华语').then((res) => {
      this.setData({ recommendSongMenu: res.playlists })
    })
  },

  handleSearchClick() {
    wx.navigateTo({ url: '/packageDetail/pages/detail-search/index' })
  },

  // 监听 image load 事件，根据 image 的高度去设置 swiper 的高度
  handleSwiperImageLoaded() {
    throttleQueryRect('.swiper-image').then((res) => {
      this.setData({ swiperHeight: res[0].height })
    })
  },

  handleMoreClick() {
    this.toDetailSongsPage('hotRanking')
  },
  handleRankingItemClick(event) {
    const ranking = event.currentTarget.dataset.key
    this.toDetailSongsPage(ranking)
  },
  toDetailSongsPage(ranking) {
    wx.navigateTo({
      url: `/packageDetail/pages/detail-songs/index?ranking=${ranking}&type=rank`,
    })
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.recommendSongs)
    playerStore.setState('playListIndex', index)
  },

  handlePlayBtnClick: function (event) {
    playerStore.dispatch('changeMusicPlayStatusAction', !this.data.isPlaying)
    // 小程序不支持这方法，需要使用 catch:tap
    // event.stopPropagation()
  },

  handlePlayBarClick: function () {
    wx.navigateTo({
      url: `/pages/music-player/index?id=${this.data.currentSong.id}`,
    })
  },

  setupPlayerStoreListener: function () {
    // 1. 排行榜监听
    rankingStore.onState('hotRanking', (res) => {
      if ((res?.tracks || []).length <= 0) return
      const recommendSongs = res.tracks.slice(0, 15)
      this.setData({ recommendSongs })
    })
    rankingStore.onState('newRanking', this.getRankingHandler('newRanking'))
    rankingStore.onState('originRanking', this.getRankingHandler('originRanking'))
    rankingStore.onState('upRanking', this.getRankingHandler('upRanking'))

    // 2. 播放器监听
    playerStore.onStates(['currentSong', 'isPlaying'], ({ currentSong, isPlaying }) => {
      if (currentSong) this.setData({ currentSong })
      if (isPlaying !== undefined) this.setData({ isPlaying, playAnimState: isPlaying ? 'running' : 'paused' })
    })
  },

  onUnload: function () {
    // 取消监听
    // rankingStore.offState('newRanking', this.getNewRankingHandler)
  },

  getRankingHandler: function (key) {
    return (res) => {
      if (Object.keys(res).length <= 0) return
      const { name, coverImgUrl, playCount, tracks } = res
      const newRankings = { ...this.data.rankings, [key]: { name, coverImgUrl, playCount, songList: tracks.slice(0, 3) } }
      this.setData({ rankings: newRankings })
    }
  },
})
