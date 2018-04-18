import React from 'react'
import PropTypes from 'prop-types'
import { numFormat, timeFormat } from 'utils/index'
import './mvList.styl'

function MvList(props) {
    let { list } = props

    return (
        <div className="mv-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="icon" style={{ backgroundImage: `url(${item.cover})`}}>
                            <span className="play-count">
                                <i className="iconfont">&#xe77e;</i>
                                {numFormat(item.playCount)}
                            </span>
                        </div>
                        <div className="content">
                            <div className="name" style={{ WebkitBoxOrient: 'vertical' }}>{item.name}</div>
                            <div className="info">
                                <span className="duration">{timeFormat(item.duration)}&nbsp;</span>
                                <span className="artist-name">{item.artistName}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

MvList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MvList