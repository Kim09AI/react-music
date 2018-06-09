import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Lyric from 'lyric-parser'
import ProgressBar from '../progressBar/ProgressBar'
import Scroll from 'components/scroll/Scroll'
import { timeFormat, modeData } from 'utils'
import watcher from 'utils/watcher'
import './fullPlay.styl'

export default class FullPlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLyric: false,
            lines: [],
            currentLine: 0
        }
        this.resetLyricPlay = this.resetLyricPlay.bind(this)
        this.transitionEnd = this.transitionEnd.bind(this)
    }

    componentDidMount() {
        this.initLyric(this.props.music.lyric, !this.props.paused)
        watcher.on('musicPlayEnd', this.resetLyricPlay)

        this.wrapper.addEventListener('webkitTransitionEnd', this.transitionEnd)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.music.id !== this.props.music.id) {
            this.initLyric(nextProps.music.lyric, !this.props.paused)
        }
        if (nextProps.show === true && this.props.show === false) {
            this.wrapper.style.display = 'block'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.paused !== prevProps.paused) {
            !this.props.paused ? this.lyricPlay(this.props.currentTime) : this.lyricStop()
        }
        
        // 歌词行数已改变或者是播放器由hide变成show
        if (this.state.currentLine !== prevState.currentLine || (this.props.show === true && prevProps.show === false)) {
            this.setLyricScroll(this.state.currentLine)
        }
    }

    componentWillUnmount() {
        this.lyricStop()
        this.lyric = null
        watcher.destroy('musicPlayEnd', this.resetLyricPlay)

        this.wrapper.removeEventListener('webkitTransitionEnd', this.transitionEnd)
    }

    initLyric(lyric, play) {
        this.lyricStop()

        if (!lyric) {
            this.lyric = null
            return
        }

        this.lyric = new Lyric(lyric, (...args) => this.lyricHandler(...args))

        this.setState({
            lines: this.lyric.lines,
            currentLine: 0
        })

        play && this.lyricPlay()
    }

    lyricHandler({ lineNum }) {
        this.setState({
            currentLine: lineNum
        })
    }

    lyricPlay(startTime = 0) {
        this.lyric && this.lyric.play(startTime)
    }

    lyricStop() {
        this.lyric && this.lyric.stop()
    }

    showLyric() {
        this.setState({
            showLyric: true
        })
    }

    hideLyric() {
        this.setState({
            showLyric: false
        })
    }

    percentageChangeFunc(percentage) {
        this.props.percentageChangeFunc(percentage)

        let currentTime = this.props.duration * percentage
        
        // 点击或拖动滚动条时，currentTime 如果小于第一条歌词的播放时间
        // lyric实例因为没有匹配的歌词，导致currentLine停留在上一次
        if (this.lyric && this.state.lines.length && currentTime < this.state.lines[0].time) {
            this.setState({
                currentLine: 0
            })
        }

        this.lyricPlay(currentTime)
    }

    setLyricScroll(currentLine) {
        if (!this.lyric || !this.state.lines.length) {
            return
        }

        setTimeout(() => {
            let lyricWrapperH = this.lyricWrapper.getBoundingClientRect().height
            let lyricPlacehoderH = this.lyricPlacehoder.getBoundingClientRect().height
            let maxScrollY = this.scroll.getMaxScrollY()
            let lyricH = (lyricWrapperH - lyricPlacehoderH) / this.state.lines.length
            let scrollY = Math.max(-lyricH * currentLine, maxScrollY)
            this.scroll.scrollTo(0, scrollY, 300)
        }, 20)
    }

    resetLyricPlay() { // 歌曲播放结束后，重置歌词位置及播放
        this.setState({
            currentLine: 0
        })
        !this.props.paused && this.lyricPlay()
    }

    transitionEnd() {
        if (!this.props.show) {
            this.wrapper.style.display = 'none'
        }
    }

    render() {
        let { showLyric, lines, currentLine } = this.state
        let { music, paused, show, togglePlay, prevMusic, nextMusic, showMusicList, percentage, currentTime, duration, goBackFunc, toggleMode, mode } = this.props
    
        return (
            <div className={classNames({ 'full-play-wrapper': true, active: show })} ref={wrapper => this.wrapper = wrapper}>
                <div className="bg" style={{ backgroundImage: `url(${music.picUrl})`}}></div>
                <div className="play-header">
                    <i className="iconfont back" onClick={() => goBackFunc()}>&#xe606;</i>
                    <div className="content">
                        <div className="name">{music.name}</div>
                        <div className="artist-name">{music.artistName}</div>
                    </div>
                    <i className="iconfont shape">&#xe648;</i>
                </div>
                <div className={classNames({ 'lyric-wrapper': true, visible: showLyric })} onClick={() => this.hideLyric()}>
                    <Scroll ref={scroll => this.scroll = scroll}>
                        <div ref={lyricWrapper => this.lyricWrapper = lyricWrapper}>
                            <div className="placehoder" ref={lyricPlacehoder => this.lyricPlacehoder = lyricPlacehoder}></div>
                            {
                                lines.map((item, index) => (
                                    <div key={index} className={classNames({ lyric: true, active: index === currentLine })}>{item.txt}</div>
                                ))
                            }
                        </div>
                    </Scroll>
                </div>
                <div className={classNames({ 'music-turn-wrapper': true, visible: !showLyric })} onClick={() => this.showLyric()}>
                    <div className={classNames({ 'dist': true, active: !paused })}></div>
                    <div className="music-turn-bg">
                        <img src={music.picUrl} alt="" className={classNames({ 'music-turn': true, stop: paused && show })} />
                    </div>
                </div>
                <div className="control-wrapper">
                    <div className="other-control">
                        <i className="iconfont">&#xe76a;</i>
                        <i className="iconfont">&#xe794;</i>
                        <i className="iconfont">&#xe64b;</i>
                        <i className="iconfont">&#xe609;</i>
                    </div>
                    <div className="progressbar-wrapper">
                        <span>{timeFormat(currentTime)}</span>
                        <div className="progress">
                            <ProgressBar percentage={percentage} percentageChangeFunc={(percentage) => this.percentageChangeFunc(percentage)} />
                        </div>
                        <span>{timeFormat(duration)}</span>
                    </div>
                    <div className="play-control">
                        <i className="iconfont" onClick={() => toggleMode()} dangerouslySetInnerHTML={{ __html: modeData[mode].icon }}></i>
                        <i className="iconfont" onClick={() => prevMusic()}>&#xe610;</i>
                        <span className="play-btn" onClick={() => togglePlay()}>
                            <i className={classNames({ iconfont: true, paused })} dangerouslySetInnerHTML={{ __html: paused ? '&#xe77e;' : '&#xe79f;' }}></i>
                        </span>
                        <i className="iconfont" onClick={() => nextMusic()}>&#xe611;</i>
                        <i className="iconfont" onClick={() => showMusicList()}>&#xe602;</i>
                    </div>
                </div>
            </div>
        )
    }
}

FullPlay.propTypes = {
    music: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        duration: PropTypes.number,
        artistName: PropTypes.string,
        picUrl: PropTypes.string,
        url: PropTypes.string,
        lyric: PropTypes.string
    }),
    togglePlay: PropTypes.func,
    paused: PropTypes.bool,
    percentage: PropTypes.number,
    show: PropTypes.bool,
    showMusicList: PropTypes.func,
    nextMusic: PropTypes.func,
    prevMusic: PropTypes.func,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    percentageChangeFunc: PropTypes.func,
    goBackFunc: PropTypes.func,
    mode: PropTypes.string,
    toggleMode: PropTypes.func
}