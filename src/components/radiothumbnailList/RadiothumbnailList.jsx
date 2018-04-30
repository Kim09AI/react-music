import React from 'react'
import PropTypes from 'prop-types'
import './radiothumbnailList.styl'

export default function RadioThumbnailList(props) {
    let { title, list, showNum, onItemClick } = props

    return (
        <div className="radio-thumbnail-list-wrapper">
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
                            <div className="item" key={item.id} onClick={() => onItemClick(item.id)}>
                                <div className="img" style={{ backgroundImage: `url(${item.picUrl})` }}>
                                    <span className="name">{item.name}</span>
                                </div>
                                <div className="text" style={{ WebkitBoxOrient: 'vertical' }}>{item.rcmdtext}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

RadioThumbnailList.defaultProps = {
    showNum: 6
}

RadioThumbnailList.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        rcmdtext: PropTypes.string,
        picUrl: PropTypes.string,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    })).isRequired,
    showNum: PropTypes.number,
    onItemClick: PropTypes.func
}