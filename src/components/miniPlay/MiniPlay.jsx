import React from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'
import './miniPlay.styl'

export default function MiniPlay(props) {
    let { music, togglePlay, paused, borderW, r, percentage, showMusicList, swipe, contentClick } = props

    let borderR = borderW + r
    let width = borderR * 2
    let perimeter = Math.ceil(2 * Math.PI * r)

    return (
        <div className="mini-play-wrapper">
            <img className="icon" src={music.picUrl} alt=""/>
            <div className="content" onClick={() => contentClick()}>
                <Hammer onSwipe={(e) => swipe(e)}>
                    <div>
                        <div className="name">{music.name}</div>
                        <div className="tip">横滑可以切换上下首哦</div>
                    </div>
                </Hammer>
            </div>
            <span className="play-icon" onClick={() => togglePlay()}>
                <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
                    <circle cx={borderR} cy={borderR} r={r} strokeWidth={borderW} stroke="rgb(74, 74, 74)" fill="none"></circle>
                    <circle cx={borderR} cy={borderR} r={r} strokeWidth={borderW} stroke="red" fill="none" transform="matrix(0,-1,1,0,0,30)" strokeDasharray={`${perimeter * percentage} ${perimeter}`}></circle>
                </svg>
                <i className={`iconfont ${paused ? 'play' : 'pause'}`} dangerouslySetInnerHTML={{ __html: paused ? '&#xe77e;' : '&#xe79f;' }}></i>
            </span>
            <i className="iconfont list" onClick={() => showMusicList()}>&#xe602;</i>
        </div>
    )
}

MiniPlay.defaultProps = {
    borderW: 1,
    r: 14,
    percentage: 0
}

MiniPlay.propTypes = {
    music: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        duration: PropTypes.number,
        artistName: PropTypes.string,
        picUrl: PropTypes.string,
        url: PropTypes.string
    }),
    show: PropTypes.bool,
    togglePlay: PropTypes.func,
    paused: PropTypes.bool,
    percentage: PropTypes.number,
    showMusicList: PropTypes.func,
    swipe: PropTypes.func,
    contentClick: PropTypes.func
}