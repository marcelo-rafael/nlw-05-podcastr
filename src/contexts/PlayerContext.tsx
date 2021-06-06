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
  play: (episode: Episode) => void
  setPLayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  playPrevious: () => void
  playNext: () => void
  togglePLay: () => void
  toggleLoop: () => void
  hasNext: boolean
  hasPrevious: boolean
}

type PLayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PLayerContextProvider({children}: PLayerContextProviderProps) {

  const [episodeList, setEpisodelist] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

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

  function setPLayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePLay, isLooping, toggleLoop, setPLayingState, playList, hasNext, hasPrevious, playPrevious, playNext }}>
      {children}
    </PlayerContext.Provider>)
}

export const usePLayer = () => {
  return useContext(PlayerContext)
}