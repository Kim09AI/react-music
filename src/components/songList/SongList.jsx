import React from 'react'
import PropTypes from 'prop-types'
import './songList.styl'

function SongList(props) {
    return (
        <div className="song-list">
            <div className="item">
                <div className="song">
                    <div className="name">测试</div>
                    <div className="info">
                        <span className="quality">SQ&nbsp;</span>
                        <span className="singer">测试</span>
                        <span className="small-name">&nbsp;-&nbsp;测试</span>
                    </div>
                </div>
                <i className="iconfont play">&#xe78f;</i>
                <i className="iconfont more">&#xe609;</i>
            </div>
        </div>
    )
}

export default SongList