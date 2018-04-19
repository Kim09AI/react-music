import React from 'react'
import PropTypes from 'prop-types'
import './radioList.styl'

function RadioList(props) {
    let { list } = props
    return (
        <div className="radio-list">
            {
                list.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="icon" style={{ backgroundImage: `url(${item.picUrl})`}}></div>
                        <div className="info">
                            <div className="name">{item.name}</div>
                            <div className="other">{item.dj.nickname}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

RadioList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RadioList