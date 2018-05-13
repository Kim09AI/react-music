import React from 'react'
import { connect } from 'react-redux'
import { prevMusic, nextMusic, switchMusic, removeMusic } from '../actions/music'
import MiniPlay from 'components/miniPlay/MiniPlay'
import MusicList from 'components/musicList/MusicList'
import FullPlay from 'components/fullPlay/FullPlay'

class Play extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paused: true,
            currentTime: 0,
            initSuccess: false,
            showList: false
        }
    }
    
    componentDidMount() {
        this.initAudioEvent()
    }

    componentDidUpdate() {
        this.initAudioEvent()
    }

    initAudioEvent() {
        if (!this.audio || this.state.initSuccess) {
            return
        }

        this.setState({
            initSuccess: true,
            paused: false
        })

        this.audio.addEventListener('error', (e) => {
            console.log('播放出错')

            this.setState({
                paused: true
            })
        })

        this.audio.addEventListener('timeupdate', () => this.timeUpdate())

        this.audio.addEventListener('ended', () => this.ended())

        this.audio.addEventListener('canplay', () => {
            this.state.paused && this.setState({
                paused: false
            })
        })
    }

    timeUpdate() {
        let currentTime = this.audio.currentTime
        this.setState({
            currentTime
        })
    }

    ended() {
        if (this.props.currentList.length > this.props.currentIndex + 1) {
            this.props.nextMusic(true)
            this.setState({
                currentTime: 0
            })
        } else {
            this.setState({
                paused: true,
                currentTime: 0
            })
        }
    }
    
    togglePlay() {
        let paused = this.audio.paused

        if (paused) { // 暂停状态
            this.audio.play()
        } else {
            this.audio.pause()
        }

        this.setState({
            paused: !paused
        })
    }

    toggleMusicList() {
        this.setState({
            showList: !this.state.showList
        })
    }

    switchMusic(id) {
        let currentMusic = this.props.currentList[this.props.currentIndex]
        if (currentMusic.id === id) {
            return
        }

        this.props.switchMusic(id)
    }

    swipe(e) {
        if (e.direction === 2) { // 左滑
            this.props.nextMusic()
        } else if (e.direction === 4) { // 右滑
            this.props.prevMusic()
        }
    }

    render() {
        let { paused, currentTime, showList } = this.state
        let { currentIndex, originList, currentList, showPlay, removeMusic, prevMusic, nextMusic } = this.props

        if (!showPlay) {
            return null
        }

        return (
            <div>
                <MiniPlay 
                    music={currentList[currentIndex]} 
                    paused={paused} 
                    percentage={currentTime / currentList[currentIndex].duration * 1000} 
                    showMusicList={() => this.toggleMusicList()}
                    togglePlay={() => this.togglePlay()} 
                    swipe={(e) => this.swipe(e)}
                />
                <FullPlay
                    music={currentList[currentIndex]} 
                    paused={paused} 
                    percentage={currentTime / currentList[currentIndex].duration * 1000} 
                    showMusicList={() => this.toggleMusicList()}
                    togglePlay={() => this.togglePlay()} 
                    prevMusic={() => prevMusic()}
                    nextMusic={() => nextMusic()}
                />
                {
                    !!currentList.length && <audio ref={audio => this.audio = audio} src={currentList[currentIndex].url} autoPlay></audio>
                }
                <MusicList 
                    list={originList} 
                    show={showList} 
                    activeId={currentList[currentIndex].id} 
                    switchMusic={(id) => this.switchMusic(id)} 
                    hideMusicList={() => this.toggleMusicList()} 
                    removeMusic={(music) => removeMusic(music)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const music = state.music

    return {
        originList: music.originList,
        currentList: music.currentList,
        currentIndex: music.currentIndex,
        showPlay: music.showPlay
    }
}

const mapDispatchToProps = {
    prevMusic,
    nextMusic,
    switchMusic,
    removeMusic
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)