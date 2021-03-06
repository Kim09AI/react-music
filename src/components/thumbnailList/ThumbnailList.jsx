import React from 'react'
import PropTypes from 'prop-types'
import { numFormat } from 'utils/index'
import './thumbnailList.styl'

export default function ThumbnailList(props) {
    let { title, list, showNum } = props

    return (
        <div className="thumbnail-list-wrapper">
            <h3 className="title">
                {title}
                <i className="iconfont">&#xe628;</i>
            </h3>
            <div className="thumbnail-list">
                {
                    list.map((item, index) => {
                        if (index + 1 > showNum) {
                            return null
                        }

                        return (
                            <div className="item" key={index} onClick={() => props.onClick(index)}>
                                <div className="img" style={{ backgroundImage: `url(${item.picUrl})` }}></div>
                                <span className="count">
                                    <i className="iconfont icon-erji">&#xe6c8;</i>
                                    {numFormat(item.playCount)}    
                                </span>
                                <div className="name" style={{ WebkitBoxOrient: 'vertical' }}>{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

ThumbnailList.defaultProps = {
    showNum: 6
}

ThumbnailList.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        playCount: PropTypes.number,
        picUrl: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    })).isRequired,
    showNum: PropTypes.number,
    onClick: PropTypes.func.isRequired
}