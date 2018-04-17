import React from 'react'
import PropTypes from 'prop-types'
import './songList.styl'

function SongList(props) {
    let { list } = props

    return (
        <div className="song-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="song">
                            <div className="name">{item.name}</div>
                            <div className="info">
                                <span className="quality">SQ</span>
                                <span className="singer">{item.artists[0].name}</span>
                                <span className="small-name">&nbsp;-&nbsp;{item.name}</span>
                            </div>
                        </div>
                        <i className="iconfont play">&#xe78f;</i>
                        <i className="iconfont">&#xe609;</i>
                    </div>
                ))
            }
        </div>
    )
}

SongList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default SongList