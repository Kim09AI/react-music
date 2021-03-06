import React from 'react'
import PropTypes from 'prop-types'
import './songList.styl'

function SongList(props) {
    let { list, showRank, onContentClick } = props

    return (
        <div className="song-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        {
                            showRank && <span className="rank">{index + 1}</span>
                        }
                        <div className="song" onClick={() => onContentClick(index)}>
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
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    showRank: PropTypes.bool,
    onContentClick: PropTypes.func.isRequired
}

export default SongList