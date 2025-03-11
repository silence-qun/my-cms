import { HYEventStore } from 'hy-event-store'
import { getTopList, getRankings } from '../service/api_music'

const topListCfg = [
  { name: '飙升榜', key: 'upRanking' },
  { name: '新歌榜', key: 'newRanking' },
  { name: '原创榜', key: 'originRanking' },
  { name: '热歌榜', key: 'hotRanking' },
]

const rankingStore = new HYEventStore({
  state: { upRanking: {}, newRanking: {}, originRanking: {}, hotRanking: {} },
  actions: {
    getRankingDataAction(ctx) {
      getTopList()
        .then((res) => {
          const promises = []
          topListCfg.forEach((top) => {
            const id = res.list.find((item) => item.name === top.name)?.id
            id && promises.push(getRankings(id))
          })
          return Promise.all(promises)
        })
        .then((res) => {
          topListCfg.forEach((item, idx) => {
            ctx[item.key] = res[idx]?.playlist || {}
          })
        })
    },
  },
})

export { rankingStore }
