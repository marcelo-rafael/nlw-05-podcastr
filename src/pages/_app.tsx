import { useState } from 'react'

import { Header } from '../components/Header'
import {Player} from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodelist] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode) {
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
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    <Player />
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
