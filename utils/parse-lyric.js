const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyric) {
  const lyricStr = lyric.split('\n')
  const lyricInfos = []
  for (let lineStr of lyricStr) {
    const timeResult = timeRegExp.exec(lineStr)
    if (!timeResult) continue
    // 获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond

    // 获取文本
    const text = lineStr.replace(timeRegExp, '')

    lyricInfos.push({ time, text })
  }

  return lyricInfos
}
