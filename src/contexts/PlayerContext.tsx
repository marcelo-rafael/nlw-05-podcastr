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
  togglePLay: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PLayerContextProviderProps = {
  children: ReactNode
}

export function PLayerContextProvider({children}: PLayerContextProviderProps) {

  const [episodeList, setEpisodelist] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodelist([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePLay() {
    setIsPlaying(!isPlaying)
  }

  function setPLayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePLay, setPLayingState }}>
      {children}
    </PlayerContext.Provider>)
}