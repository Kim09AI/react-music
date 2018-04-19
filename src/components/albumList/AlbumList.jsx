import React from 'react'
import PropTypes from 'prop-types'
import { getDate } from 'utils/index'
import './albumList.styl'

function AlbumList(props) {
    let { list } = props
    return (
        <div className="album-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="icon" style={{ backgroundImage: `url(${item.picUrl})`}}></div>
                        <div className="info">
                            <div className="name">
                                {item.name}
                                {
                                    item.alias[0] && <span className="alias">&nbsp;({item.alias[0]})</span>
                                }
                            </div>
                            <div className="other">
                                <span className="artist">{item.artist.name}</span>
                                <span>&nbsp;{getDate(item.publishTime)}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

AlbumList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AlbumList