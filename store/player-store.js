import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from '../service/api_player'
import { parseLyric } from '../utils/parse-lyric'

const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],
    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',
    isPlaying: false,
    playModeIndex: 0, // 0: 顺序播放  1: 单曲循环  2: 随机播放
  },
  actions: {
    playMusicWithSongIdAction(ctx, { id }) {
      ctx.id = id

      ctx.isPlaying = true

      getSongDetail(id).then((res) => {
        // this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })

      getSongLyric(id).then(({ lrc: { lyric } }) => {
        const lyricInfos = parseLyric(lyric)
        // this.setData({ lyricInfos })
        ctx.lyricInfos = lyricInfos
      })

      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.volume = 0.3

      // 监听 audioContext 一些事件
      this.dispatch('setupAudioContextListenerAction')
    },
    setupAudioContextListenerAction(ctx) {
      // autoplay 和 play() 不能同时设置，会导致音频无法通过 pause/stop 等方法暂停/停止
      // audioContext.autoplay = true
      audioContext.onCanplay(() => {
        audioContext.play()
      })

      // 监听时间变化
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

    },
    changeMusicPlayStatusAction(ctx) {
      ctx.isPlaying = !ctx.isPlaying
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    }
  }
})

export { audioContext, playerStore }