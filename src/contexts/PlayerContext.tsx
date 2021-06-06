import { createContext, useState, ReactNode } from 'react'

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
  play: (episode: Episode) => void
  setPLayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  playPrevious: () => void
  playNext: () => void
  togglePLay: () => void
}

type PLayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PLayerContextProvider({children}: PLayerContextProviderProps) {

  const [episodeList, setEpisodelist] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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

  function setPLayingState(state: boolean) {
    setIsPlaying(state)
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1

    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePLay, setPLayingState, playList, playPrevious, playNext }}>
      {children}
    </PlayerContext.Provider>)
}