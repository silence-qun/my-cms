// pages/music-player/index.js
// import { getSongDetail, getSongLyric } from '../../service/api_player'
import { audioContext, playerStore } from '../../../store/index'
// import { parseLyric } from '../../utils/parse-lyric'

const playModeNames = ['cycle', 'cycle-singe', 'random']

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
    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: '',
    lyricScrollTop: 0,
    playModeIndex: 0,
    playModeName: 'cycle',
    isPlaying: false,
    playingName: 'play'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({ id })

    // this.getPageData(id)
    this.setupPlayerStoreListener()

    const { screenHeight, statusBarHeight, navBarHeight, deviceRadio } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2 })

    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // audioContext.volume = 0.3
    // autoplay 和 play() 不能同时设置，会导致音频无法通过 pause/stop 等方法暂停/停止
    // audioContext.autoplay = true
    // this.setupAudioContextListener()
  },

  // getPageData: function (id) {
  //   getSongDetail(id).then((res) => {
  //     this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
  //   })

  //   getSongLyric(id).then(({ lrc: { lyric } }) => {
  //     const lyricInfos = parseLyric(lyric)
  //     this.setData({ lyricInfos })
  //   })
  // },

  // setupAudioContextListener: function () {
  //   // autoplay 和 play() 不能同时设置，会导致音频无法通过 pause/stop 等方法暂停/停止
  //   // audioContext.autoplay = true
  //   audioContext.onCanplay(() => {
  //     audioContext.play()
  //   })

  //   // 监听时间变化
  //   audioContext.onTimeUpdate(() => {
  //     // 1. 获取当前时间
  //     const currentTime = audioContext.currentTime * 1000

  //     // 2. 根据当前时间修改 currentTime/sliderValue
  //     if (!this.data.isSliderChanging) {
  //       const sliderValue = (currentTime / this.data.durationTime) * 100
  //       this.setData({ currentTime, sliderValue })
  //     }

  //     // 3. 根据当前时间去查找播放的歌词
  //     // 写法一
  //     // for (let i = 0; i < this.data.lyricInfos.length; i++) {
  //     //   const lyricInfo = this.data.lyricInfos[i]
  //     //   if (currentTime < lyricInfo.time) {
  //     //     const currentIndex = i - 1
  //     //     if (this.data.currentLyricIndex !== currentIndex) {
  //     //       const currentLyricInfo = this.data.lyricInfos[currentIndex]
  //     //       this.setData({ currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex })
  //     //     }
  //     //     break
  //     //   }
  //     // }

  //     // 写法二
  //     if (!this.data.lyricInfos.length) return
  //     let i = 0
  //     for (; i < this.data.lyricInfos.length; i++) {
  //       const lyricInfo = this.data.lyricInfos[i]
  //       if (currentTime < lyricInfo.time) break
  //     }

  //     const currentIndex = i - 1
  //     if (this.data.currentLyricIndex !== currentIndex) {
  //       const currentLyricInfo = this.data.lyricInfos[currentIndex]
  //       // 35为歌词的高度，可设为常量，将 height、line-height 设为行内样式
  //       this.setData({ currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex, lyricScrollTop: currentIndex * 35 })
  //     }
  //   })
  // },

  handleSwiperChange: function (event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },

  handleSliderChange: function (event) {
    const value = event.detail.value
    const currentTime = (this.data.durationTime * value) / 100

    // audioContext.pause()
    // InnerAudioContext.seek(number position) 跳转的时间，单位 s
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, isSliderChanging: false })
  },

  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = (this.data.durationTime * value) / 100
    this.setData({ isSliderChanging: true, currentTime })
  },

  handleBackBtnClick: function () {
    wx.navigateBack()
  },

  handleModeBtnClick: function () {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) playModeIndex = 0

    playerStore.setState('playModeIndex', playModeIndex)
  },

  handlePlayBtnClick: function () {
    playerStore.dispatch('changeMusicPlayStatusAction', !this.data.isPlaying)
  },

  handlePrevBtnClick: function () {
    playerStore.dispatch('changeNewMusicAction', false)
  },

  handleNextBtnClick: function () {
    playerStore.dispatch('changeNewMusicAction')
  },

  // 数据监听
  handleCurrentMusicListener({ currentSong, durationTime, lyricInfos }) {
    if (currentSong) this.setData({ currentSong })
    if (durationTime) this.setData({ durationTime })
    if (lyricInfos) this.setData({ lyricInfos })
  },

  setupPlayerStoreListener: function () {
    playerStore.onStates(['currentSong', 'durationTime', 'lyricInfos'], this.handleCurrentMusicListener)

    playerStore.onStates(['currentTime', 'currentLyricIndex', 'currentLyricText'], ({ currentTime, currentLyricIndex, currentLyricText }) => {
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = (currentTime / this.data.durationTime) * 100
        this.setData({ currentTime, sliderValue })
      }
      if (currentLyricIndex) {
        this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
      }
      if (currentLyricText) {
        this.setData({ currentLyricText })
      }
    })

    playerStore.onStates(['playModeIndex', 'isPlaying'], ({ playModeIndex, isPlaying }) => {
      if (playModeIndex !== undefined) this.setData({ playModeIndex, playModeName: playModeNames[playModeIndex] })
      if (isPlaying !== undefined) this.setData({ isPlaying, playingName: isPlaying ? 'pause' : 'play' })
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    playerStore.offStates(['currentSong', 'durationTime', 'lyricInfos'], this.handleCurrentMusicListener)
  },
})
