export const count = state => state.count
export const isLoading = state => state.isLoading
export const lyricsData = state =>state.lyrics.lyricsData
export const currentTimes = state =>state.lyrics.currentTimes
export const startTimes = state =>state.lyrics.startTimes
export const endTimes = state =>state.lyrics.endTimes
export const lyricsMTop = state =>state.lyricsMTop
export const playTime = state =>state.playTime
export const id = state =>state.current.id
export const playUrl = state =>state.current.playUrl
export const playState = state =>state.playState
export const isThereAnyLyric = state =>state.lyrics.isThereAnyLyric
export const al = state => state.current.detail.al
export const ar = state => state.current.detail.ar
export const palyName = state => state.current.detail.name
export const publishTime = state => state.current.detail.publishTime
export const song = state => state.song