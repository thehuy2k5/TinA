import { computed, reactive } from 'vue'

const STORAGE_KEY = 'tina-listening-history'
const savedHistory = readHistory()
const canUseNativeMedia =
  typeof Audio !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  !navigator.userAgent.toLowerCase().includes('jsdom')
const media = canUseNativeMedia ? new Audio() : null

let mockTimer = null
let lastPersistedSecond = -1

const state = reactive({
  accountOpen: false,
  queueOpen: false,
  current: null,
  playing: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  miniPlayerVisible: false,
  history: savedHistory,
})

if (media) {
  media.preload = 'metadata'

  media.addEventListener('loadedmetadata', () => {
    state.duration = Number.isFinite(media.duration) ? media.duration : state.current?.duration || 0
  })

  media.addEventListener('timeupdate', () => {
    state.currentTime = media.currentTime
    syncCurrentProgress()
  })

  media.addEventListener('play', () => {
    state.playing = true
  })

  media.addEventListener('pause', () => {
    state.playing = false
  })

  media.addEventListener('ended', () => {
    state.playing = false
    state.currentTime = state.duration
    syncCurrentProgress(true)
  })
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history))
}

function getCurrentEntry() {
  return state.history.find((item) => item.episode.id === state.current?.id)
}

function syncCurrentProgress(force = false) {
  const entry = getCurrentEntry()

  if (!entry || !state.duration) return

  entry.progress = Math.min(state.currentTime / state.duration, 1)
  entry.updatedAt = Date.now()

  const currentSecond = Math.floor(state.currentTime)
  if (force || currentSecond % 5 === 0) {
    if (force || currentSecond !== lastPersistedSecond) {
      lastPersistedSecond = currentSecond
      persist()
    }
  }
}

function stopMockTimer() {
  if (mockTimer) {
    clearInterval(mockTimer)
    mockTimer = null
  }
}

function startMockTimer() {
  stopMockTimer()

  mockTimer = setInterval(() => {
    if (!state.playing || !state.current) return

    state.currentTime = Math.min(state.currentTime + 1, state.duration)
    syncCurrentProgress()

    if (state.currentTime >= state.duration) {
      state.playing = false
      stopMockTimer()
      syncCurrentProgress(true)
    }
  }, 1000)
}

function setEpisode(episode) {
  const isNewEpisode = state.current?.id !== episode.id
  const existingEntry = state.history.find((item) => item.episode.id === episode.id)

  state.current = episode
  state.duration = episode.duration || 0
  state.currentTime = isNewEpisode
    ? Math.round((existingEntry?.progress || 0) * state.duration)
    : state.currentTime
  state.miniPlayerVisible = true

  if (existingEntry) {
    existingEntry.updatedAt = Date.now()
  } else {
    state.history.unshift({
      episode,
      progress: 0,
      updatedAt: Date.now(),
    })
  }

  persist()
}

async function startPlayback() {
  if (!state.current) return

  state.playing = true

  if (media && state.current.audioUrl) {
    const sourceChanged = media.src !== new URL(state.current.audioUrl, window.location.href).href

    if (sourceChanged) {
      media.src = state.current.audioUrl
      media.load()
    }

    media.currentTime = state.currentTime
    media.volume = state.volume

    try {
      await media.play()
      stopMockTimer()
      return
    } catch {
      // API URL chưa phát được: vẫn mô phỏng tiến trình để giữ trải nghiệm UI.
    }
  }

  startMockTimer()
}

export function useAppState() {
  const play = (episode) => {
    if (!episode) return
    setEpisode(episode)
    startPlayback()
  }

  const toggle = () => {
    if (!state.current) return

    if (state.playing) {
      state.playing = false
      stopMockTimer()
      media?.pause()
      syncCurrentProgress(true)
    } else {
      startPlayback()
    }
  }

  const seek = (seconds) => {
    const nextTime = Math.max(0, Math.min(Number(seconds), state.duration || 0))
    state.currentTime = nextTime

    if (media && state.current?.audioUrl) {
      media.currentTime = nextTime
    }

    syncCurrentProgress(true)
  }

  const setVolume = (value) => {
    state.volume = Math.max(0, Math.min(Number(value), 1))
    if (media) media.volume = state.volume
  }

  const remove = (id) => {
    state.history = state.history.filter((item) => item.episode.id !== id)

    if (state.current?.id === id) {
      stopMockTimer()
      media?.pause()
      state.current = null
      state.playing = false
      state.currentTime = 0
      state.duration = 0
      state.miniPlayerVisible = false
    }

    persist()
  }

  const clear = () => {
    stopMockTimer()
    media?.pause()
    state.history = []
    state.current = null
    state.playing = false
    state.currentTime = 0
    state.duration = 0
    state.miniPlayerVisible = false
    persist()
  }

  const closePlayer = () => {
    state.playing = false
    state.miniPlayerVisible = false
    stopMockTimer()
    media?.pause()
    syncCurrentProgress(true)
  }

  return {
    state,
    badgeCount: computed(() => state.history.length),
    currentProgress: computed(() => {
      if (!state.duration) return 0
      return Math.min(state.currentTime / state.duration, 1)
    }),
    play,
    toggle,
    seek,
    setVolume,
    remove,
    clear,
    closePlayer,
  }
}
