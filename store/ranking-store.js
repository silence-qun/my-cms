import { HYEventStore } from 'hy-event-store'
import { getTopList, getRankings } from '../service/api_music'

const rankingStore = new HYEventStore({
  state: { hotRanking: [] },
  actions: {
    getRankingDataAction(ctx) {
      getTopList()
        .then((res) => {
          return getRankings(res.list[0].id)
        })
        .then((res) => {
          ctx.hotRanking = res?.playlist?.tracks || []
        })
    },
  },
})

export { rankingStore }
