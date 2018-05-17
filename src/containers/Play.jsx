import React from 'react'
import { connect } from 'react-redux'
import { prevMusic, nextMusic, switchMusic, removeMusic, toggleMode, removeAllMusic } from '../actions/music'
import MiniPlay from 'components/miniPlay/MiniPlay'
import MusicList from 'components/musicList/MusicList'
import FullPlay from 'components/fullPlay/FullPlay'
import Alert from 'components/alert/Alert'
import Popup from 'components/popup/Popup'

class Play extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paused: true,
            currentTime: 0,
            initSuccess: false,
            showList: false,
            showMiniPlay: true,
            autoPlay: !this.props.showPlay
        }
        this.playError = this.playError.bind(this)
        this.timeUpdate = this.timeUpdate.bind(this)
        this.ended = this.ended.bind(this)
        this.canPlay = this.canPlay.bind(this)
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
            initSuccess: true
        })

        this.audio.addEventListener('error', this.playError)

        this.audio.addEventListener('timeupdate', this.timeUpdate)

        this.audio.addEventListener('ended', this.ended)

        this.audio.addEventListener('canplay', this.canPlay)
    }

    destoryAudioEvent() {
        this.audio.removeEventListener('error', this.playError)

        this.audio.removeEventListener('timeupdate', this.timeUpdate)

        this.audio.removeEventListener('ended', this.ended)

        this.audio.removeEventListener('canplay', this.canPlay)

        this.audio = null
    }

    canPlay() {
        // 如果是第一次播放且不是自动播放,即只初始化播放器的情况
        if (this.firstMusic === undefined && !this.state.autoPlay) {
            this.firstMusic = false
            return
        }

        this.state.paused && this.setState({
            paused: false,
            autoPlay: true
        })
        this.audio.play()
    }

    playError() {
        if (this.props.currentList.length === 1) {
            this.alert.show('播放出错')
            this.setState({
                paused: true
            })
            return
        }
        
        this.alert.show('播放出错,自动切换下一首')
        this.props.nextMusic()
    }

    timeUpdate() {
        let currentTime = this.audio.currentTime
        this.setState({
            currentTime
        })
    }

    ended() {
        if (this.props.mode === 'loop') {
            this.audio.currentTime = 0
            return
        }

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
            paused: !paused,
            autoPlay: true
        })
    }

    showMusicList() {
        this.setState({
            showList: true
        })
    }

    hideMusicList() {
        this.setState({
            showList: false
        })
    }

    toggleMusicPlay() {
        this.setState({
            showMiniPlay: !this.state.showMiniPlay
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

    percentageChangeFunc(percentage) {
        let { currentIndex, currentList } = this.props
        let duration = currentList[currentIndex].duration / 1000
        this.audio.currentTime = duration * percentage
    }

    showPopup() {
        this.popup.show()
    }

    removeMusic(music) {
        if (this.props.currentList.length === 1) {
            this.removeAllMusic()
            return
        }
        this.props.removeMusic(music)
    }

    removeAllMusic() {
        this.setState({
            paused: true,
            currentTime: 0,
            initSuccess: false,
            showList: false,
            showMiniPlay: true,
            autoPlay: true
        })
        
        this.destoryAudioEvent()
        this.props.removeAllMusic()
    }

    render() {
        let { paused, currentTime, showList, showMiniPlay, autoPlay } = this.state
        let { currentIndex, originList, currentList, showPlay, prevMusic, nextMusic, mode, toggleMode } = this.props
        
        if (!showPlay) {
            return null
        }

        return (
            <div>
                <MiniPlay 
                    music={currentList[currentIndex]} 
                    paused={paused} 
                    percentage={currentTime / currentList[currentIndex].duration * 1000} 
                    showMusicList={() => this.showMusicList()}
                    togglePlay={() => this.togglePlay()} 
                    swipe={(e) => this.swipe(e)}
                    contentClick={() => this.toggleMusicPlay()}
                />
                <FullPlay
                    music={currentList[currentIndex]} 
                    paused={paused} 
                    percentage={currentTime / currentList[currentIndex].duration * 1000} 
                    show={!showMiniPlay}
                    mode={mode}
                    showMusicList={() => this.showMusicList()}
                    togglePlay={() => this.togglePlay()} 
                    prevMusic={() => prevMusic()}
                    nextMusic={() => nextMusic()}
                    currentTime={currentTime * 1000}
                    duration={currentList[currentIndex].duration}
                    percentageChangeFunc={(percentage) => this.percentageChangeFunc(percentage)}
                    goBackFunc={() => this.toggleMusicPlay()}
                    toggleMode={() => toggleMode()}
                />
                {
                    !!currentList.length && <audio ref={audio => this.audio = audio} src={currentList[currentIndex].url} autoPlay={autoPlay}></audio>
                }
                <MusicList 
                    list={originList} 
                    show={showList} 
                    activeId={currentList[currentIndex].id} 
                    mode={mode}
                    switchMusic={(id) => this.switchMusic(id)} 
                    hideMusicList={() => this.hideMusicList()} 
                    removeMusic={(music) => this.removeMusic(music)}
                    toggleMode={() => toggleMode()}
                    clearAll={() => this.showPopup()}
                />
                <Alert ref={alert => this.alert = alert} />
                <Popup title="确定清空播放列表" message="确定清空播放列表" ref={popup => this.popup = popup} confirmFunc={() => this.removeAllMusic()} />
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
        showPlay: music.showPlay,
        mode: music.mode
    }
}

const mapDispatchToProps = {
    prevMusic,
    nextMusic,
    switchMusic,
    removeMusic,
    toggleMode,
    removeAllMusic
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)