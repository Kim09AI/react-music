import React from 'react'
import PropTypes from 'prop-types'
import './thumbnailList.styl'

export default function ThumbnailList(props) {
    let { title, list, showNum } = props

    function format(num) {
        if (num > 100000000) {
            return (num / 100000000).toFixed(1) + '亿'
        }

        if (num > 10000) {
            return (num / 10000).toFixed(1) + '万'
        }

        return num
    }

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
                            <div className="item" key={index}>
                                <div className="img" style={{ backgroundImage: `url(${item.picUrl})` }}></div>
                                <span className="count">
                                    <i className="iconfont icon-erji">&#xe6c8;</i>
                                    {format(item.playCount)}    
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
    showNum: PropTypes.number
}