import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from '../service/api_player'
import { parseLyric } from '../utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const playerStore = new HYEventStore({
  state: {
    isFirstPlay: true,
    isStoping: false,
    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],
    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',
    isPlaying: false,
    playModeIndex: 0, // 0: 顺序播放  1: 单曲循环  2: 随机播放
    playListSongs: [],
    playListIndex: 0
  },
  actions: {
    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (+ctx.id === +id && !isRefresh) {
        // 点击同一首歌曲时，每次都开始播放
        this.dispatch('changeMusicPlayStatusAction', true)
        return
      }

      ctx.id = id

      ctx.isPlaying = true
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ''

      getSongDetail(id).then((res) => {
        // this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        audioContext.title = res.songs[0].name
      })

      getSongLyric(id).then(({ lrc: { lyric } }) => {
        const lyricInfos = parseLyric(lyric)
        // this.setData({ lyricInfos })
        ctx.lyricInfos = lyricInfos
      })

      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = id
      audioContext.volume = 0.3

      // 监听 audioContext 一些事件
      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        ctx.isFirstPlay = false
      }
    },
    setupAudioContextListenerAction(ctx) {
      // 1. 监听歌曲可以播放
      // autoplay 和 play() 不能同时设置，会导致音频无法通过 pause/stop 等方法暂停/停止
      // audioContext.autoplay = true
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 2. 监听时间变化
      audioContext.onTimeUpdate(() => {
        // 1. 获取当前时间
        const currentTime = audioContext.currentTime * 1000

        // 2. 根据当前时间修改 currentTime/sliderValue
        // if (!this.data.isSliderChanging) {
        //   const sliderValue = (currentTime / this.data.durationTime) * 100
        //   this.setData({ currentTime, sliderValue })
        // }
        ctx.currentTime = currentTime

        // 3. 根据当前时间去查找播放的歌词
        // 写法一
        // for (let i = 0; i < this.data.lyricInfos.length; i++) {
        //   const lyricInfo = this.data.lyricInfos[i]
        //   if (currentTime < lyricInfo.time) {
        //     const currentIndex = i - 1
        //     if (this.data.currentLyricIndex !== currentIndex) {
        //       const currentLyricInfo = this.data.lyricInfos[currentIndex]
        //       this.setData({ currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex })
        //     }
        //     break
        //   }
        // }

        // 写法二
        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) break
        }

        const currentIndex = i - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyricInfo = ctx.lyricInfos[currentIndex]
          // 35为歌词的高度，可设为常量，将 height、line-height 设为行内样式
          // this.setData({ currentLyricText: currentLyricInfo.text, currentLyricIndex: currentIndex, lyricScrollTop: currentIndex * 35 })
          ctx.currentLyricText = currentLyricInfo.text
          ctx.currentLyricIndex = currentIndex
        }
      })

      // 3. 监听歌曲播放完成
      audioContext.onEnded(() => {
        this.dispatch('changeNewMusicAction')
      })

      // 4. 监听歌曲暂停/播放/停止
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        // 监听暂停时，由于 music-player 中在改变进度条时调用了 audioContext.pause()， 会导致播放页中间按钮会跳动一下
        // 解决方法一：去掉 audioContext.pause()，建议使用，因为不去掉，在 ios 系统真机上会多次触发 audioContext.onCanplay
        // 解决方法二：增加一个变量来记录是否是改变进度条时触发的，如果是不改变 isPlaying 的值
        ctx.isPlaying = false
      })
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      if (ctx.isPlaying && ctx.isStoping) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = ctx.currentSong.name
        // 从停止的位置开始播放，不能使用 audioContext.seek() 跳转到指定的位置
        audioContext.startTime = ctx.currentTime / 1000
        ctx.isStoping = false
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },
    changeNewMusicAction(ctx, isNext = true) {
      // 1. 获取当前索引
      let index = ctx.playListIndex

      // 2. 根据不同的播放模式，获取下一首歌的索引
      switch (ctx.playModeIndex) {
        case 0:
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1:
          break
        case 2:
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }

      // 3. 获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录新的索引
        ctx.playListIndex = index
      }

      // 4. 播放新的歌曲
      this.dispatch('playMusicWithSongIdAction', { id: currentSong.id, isRefresh: true })
    }
  }
})

export { audioContext, playerStore }