import React from 'react'
import PropTypes from 'prop-types'
import { numFormat, timeFormat, dateFormat } from 'utils/index'
import './programList.styl'

export default function ProgramList(props) {
    let { list } = props
    return (
        <div className="program-list-wrapper">
            {
                list.map(item => (
                    <div key={item.id} className="item">
                        <span className="serial-num">{item.serialNum}</span>
                        <div className="content">
                            <div className="name">{item.name}</div>
                            <div className="info">
                                <span>{dateFormat('MM-dd', new Date(item.createTime))}</span>
                                <span>
                                    <i className="iconfont">&#xe77e;</i>
                                    {numFormat(item.listenerCount)}
                                </span>
                                <span>
                                    <i className="iconfont">&#xeaae;</i>
                                    {timeFormat(item.duration)}
                                </span>
                            </div>
                        </div>
                        <i className="iconfont more">&#xe609;</i>
                    </div>
                ))
            }
        </div>
    )
}

ProgramList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        duration: PropTypes.number,
        listenerCount: PropTypes.number,
        serialNum: PropTypes.number,
        createTime: PropTypes.number
    })).isRequired
}