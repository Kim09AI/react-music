import React from 'react'
import PropTypes from 'prop-types'
import { numFormat } from 'utils/index'
import './playList.styl'

function PlayList(props) {
    let { list } = props
    return (
        <div className="play-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="icon" style={{ backgroundImage: `url(${item.coverImgUrl})`}}></div>
                        <div className="info">
                            <div className="name">{item.name}</div>
                            <div className="other">
                                <span>{item.trackCount}首</span>
                                <span className="nickname">by&nbsp;{item.creator.nickname}</span>
                                <span>,&nbsp;播放{numFormat(item.playCount)}次</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

PlayList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PlayList