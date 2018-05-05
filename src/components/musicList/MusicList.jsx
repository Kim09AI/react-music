import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import classNames from 'classnames'
import Scroll from '../scroll/Scroll'
import './musicList.styl'

export default function MusicList(props) {
    let { list, hideMusicList, switchMusic, activeId, show, removeMusic } = props

    return (
        <div>
            <Motion style={{ y: spring(show ? 0 : 100)}}>
                {
                    ({ y }) => (
                        <div className="music-list-wrapper" style={{ transform: `translateY(${y}%)` }}>
                            <div className="header">
                                <i className="iconfont">&#xe66d;</i>
                                <span className="text">列表循环&nbsp;({list.length})</span>
                                <i className="iconfont collect">&#xe62f;</i>
                                <span className="collect-text">收藏全部</span>
                                <span className="line"></span>
                                <i className="iconfont clear">&#xe66c;</i>
                            </div>
                            <div className="music-list">
                                <Scroll>
                                    <div>
                                        {
                                            list.map(item => (
                                                <div key={item.id} className="item">
                                                    <div className={classNames({ content: true, active: item.id === activeId })} onClick={() => switchMusic(item.id)}>
                                                        <i className="iconfont">&#xe64d;</i>
                                                        <span>{item.name}</span>
                                                        <span className="artist-name">&nbsp;-&nbsp;{item.artistName}</span>
                                                    </div>
                                                    <i className="iconfont close" onClick={() => removeMusic(item)}>&#xe64c;</i>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Scroll>
                            </div>
                        </div>
                    )
                }
            </Motion>
            <Motion style={{ opacity: spring(show ? 1 : 0)}}>
                {
                    ({ opacity }) => (
                        <div className="music-list-cover" onClick={() => hideMusicList()} style={{ opacity, display: opacity === 0 ? 'none' : 'block' }}></div>
                    )
                }
            </Motion>
        </div>
    )
}

MusicList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        artistName: PropTypes.string
    })),
    hideMusicList: PropTypes.func,
    switchMusic: PropTypes.func,
    activeId: PropTypes.string,
    show: PropTypes.bool,
    removeMusic: PropTypes.func
}