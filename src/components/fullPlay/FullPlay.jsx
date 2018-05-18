import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Lyric from 'lyric-parser'
import { Motion, spring } from 'react-motion'
import ProgressBar from '../progressBar/ProgressBar'
import Scroll from 'components/scroll/Scroll'
import { timeFormat, modeData } from 'utils'
import './fullPlay.styl'

export default class FullPlay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLyric: false,
            lines: [],
            currentLine: 0
        }
    }

    componentDidMount() {
        this.initLyric(this.props.music.lyric)
        this.setLyricState(!this.props.paused)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.music.id !== this.props.music.id) {
            this.initLyric(nextProps.music.lyric)
            this.setLyricState(!nextProps.paused)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.paused !== prevProps.paused) {
            this.setLyricState(!this.props.paused)
        }
    }

    initLyric(lyric) {
        this.lyric && this.lyric.stop()
        this.lyric = new Lyric(lyric, (...args) => this.lyricHandler(...args))

        this.setState({
            lines: this.lyric.lines,
            currentLine: 0
        })
    }

    lyricHandler({ lineNum }) {
        // console.log(lineNum)
        this.setState({
            currentLine: lineNum
        })
    }

    setLyricState(play) {
        // play ? this.lyric.play() : this.lyric.stop()
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

    render() {
        let { showLyric, lines, currentLine } = this.state
        let { music, paused, show, togglePlay, prevMusic, nextMusic, showMusicList, percentage, currentTime, duration, percentageChangeFunc, goBackFunc, toggleMode, mode } = this.props
    
        return (
            <Motion style={{ y: spring(show ? 0 : 100), opacity: spring(show ? 1 : 0) }}>
                {
                    ({ y, opacity }) => (
                        <div className="full-play-wrapper" style={{ transform: `translateY(${y}px)`, opacity, display: opacity === 0 ? 'none' : 'block' }}>
                            <div className="bg" style={{ backgroundImage: `url(${music.picUrl})`}}></div>
                            <div className="play-header">
                                <i className="iconfont back" onClick={() => goBackFunc()}>&#xe606;</i>
                                <div className="content">
                                    <div className="name">{music.name}</div>
                                    <div className="artist-name">{music.artistName}</div>
                                </div>
                                <i className="iconfont shape">&#xe648;</i>
                            </div>
                            {
                                showLyric
                                    ? (
                                        <div className="lyric-wrapper" onClick={() => this.hideLyric()}>
                                            <Scroll>
                                                <div>
                                                    <div className="placehoder"></div>
                                                    {
                                                        lines.map((item, index) => (
                                                            <div key={index} className={classNames({ lyric: true, active: index === currentLine })}>{item.txt}</div>
                                                        ))
                                                    }
                                                </div>
                                            </Scroll>
                                        </div>
                                    )
                                    : (
                                        <div className="music-turn-wrapper" onClick={() => this.showLyric()}>
                                            <div className={classNames({ 'dist': true, active: !paused })}></div>
                                            <div className="music-turn-bg">
                                                <img src={music.picUrl} alt="" className={classNames({ 'music-turn': true, stop: paused && show })} />
                                            </div>
                                        </div>
                                    )
                            }
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
                                        <ProgressBar percentage={percentage} percentageChangeFunc={(percentage) => percentageChangeFunc(percentage)} />
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
            </Motion>
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