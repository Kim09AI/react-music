import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './fullPlay.styl'

export default function FullPlay(props) {
    let { music, paused, togglePlay, prevMusic, nextMusic, showMusicList } = props
    
    return (
        <div className="full-play-wrapper">
            <div className="bg" style={{ backgroundImage: `url(${music.picUrl})`}}></div>
            <div className="play-header">
                <i className="iconfont back">&#xe606;</i>
                <div className="content">
                    <div className="name">{music.name}</div>
                    <div className="artist-name">{music.artistName}</div>
                </div>
                <i className="iconfont shape">&#xe648;</i>
            </div>
            <div className="music-turn-wrapper">
                <div className="dist"></div>
                <div className="music-turn-bg">
                    <img src={music.picUrl} alt="" className={classNames({ 'music-turn': true, active: paused })} />
                </div>
            </div>
            <div className="control-wrapper">
                <div className="other-control">
                    <i className="iconfont">&#xe76a;</i>
                    <i className="iconfont">&#xe794;</i>
                    <i className="iconfont">&#xe64b;</i>
                    <i className="iconfont">&#xe609;</i>
                </div>
                <div className="play-control">
                    <i className="iconfont">&#xe66d;</i>
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

FullPlay.propTypes = {
    music: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        duration: PropTypes.number,
        artistName: PropTypes.string,
        picUrl: PropTypes.string,
        url: PropTypes.string
    }),
    togglePlay: PropTypes.func,
    paused: PropTypes.bool,
    percentage: PropTypes.number,
    showMusicList: PropTypes.func,
    nextMusic: PropTypes.func,
    prevMusic: PropTypes.func
}