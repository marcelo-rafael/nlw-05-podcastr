import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  play: (episode: Episode) => void
  setPLayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  playPrevious: () => void
  playNext: () => void
  togglePLay: () => void
  toggleShuffle: () => void
  toggleLoop: () => void
  clearPLayerState: () => void
  hasNext: boolean
  hasPrevious: boolean
}

type PLayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PLayerContextProvider({
  children
}: PLayerContextProviderProps) {
  const [episodeList, setEpisodelist] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodelist([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodelist(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePLay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPLayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPLayerState() {
    setEpisodelist([])
    setCurrentEpisodeIndex(0)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      )

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePLay,
        clearPLayerState,
        isLooping,
        isShuffling,
        toggleShuffle,
        toggleLoop,
        setPLayingState,
        playList,
        hasNext,
        hasPrevious,
        playPrevious,
        playNext
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePLayer = () => {
  return useContext(PlayerContext)
}
