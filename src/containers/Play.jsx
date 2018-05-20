import React from 'react'
import { connect } from 'react-redux'
import { prevMusic, nextMusic, switchMusic, removeMusic, toggleMode, removeAllMusic } from '../actions/music'
import MiniPlay from 'components/miniPlay/MiniPlay'
import MusicList from 'components/musicList/MusicList'
import FullPlay from 'components/fullPlay/FullPlay'
import Alert from 'components/alert/Alert'
import Popup from 'components/popup/Popup'
import watcher from 'utils/watcher'

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
        this.readyPlay = this.readyPlay.bind(this)
        this.addMusic = this.addMusic.bind(this)
    }
    
    componentDidMount() {
        this.initAudioEvent()
    }

    componentWillReceiveProps(nextProps) {
        // let nextMusic = nextProps.currentList[nextProps.currentIndex]
        // let music =  this.props.currentList[this.props.currentIndex]
        // let modeChange = nextProps.mode !== this.props.mode

        // if (!modeChange && (nextMusic.id === music.id)) {
        //     console.log('add')
        // }
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

        this.audio.addEventListener('canplay', this.readyPlay)

        // hack手机设置currentTime的情况
        this.audio.addEventListener('play', this.readyPlay)

        // 当添加的歌曲和播放器上当前歌曲是同一首时,即歌曲url没变不会自动播放，需要额外处理
        watcher.on('addMusic', this.addMusic)
    }

    destroyAudioEvent() {
        this.audio.removeEventListener('error', this.playError)

        this.audio.removeEventListener('timeupdate', this.timeUpdate)

        this.audio.removeEventListener('ended', this.ended)

        this.audio.removeEventListener('canplay', this.readyPlay)

        this.audio.addEventListener('play', this.readyPlay)

        watcher.destroy('addMusic', this.addMusic)

        this.audio = null
    }

    readyPlay() {
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
            // 手机hack,手动调用play
            this.audio.play()
            watcher.emit('musicPlayEnd')
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
        watcher.emit('musicPlayEnd')
    }

    addMusic(id) {
        let { currentList, currentIndex } = this.props
        let currentId = currentList[currentIndex].id
        
        if (id === currentId) {
            this.state.paused && this.togglePlay()
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
            if (this.audio.paused) {
                this.togglePlay()
            }
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

        // 设置currentTime会触发canplay事件(pc),移动为play(仅暂停时)
        this.audio.currentTime = duration * percentage
        // 手机hack,手动调用play
        this.audio.play()
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
        
        this.destroyAudioEvent()
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