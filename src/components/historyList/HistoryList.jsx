import React from 'react'
import PropTypes from 'prop-types'
import './historyList.styl'

function HistoryList(props) {
    let { searchHistory, onKeywordsClick, onCloseClick } = props

    return (
        <div className="search-history-wrapper">
            {
                searchHistory.map(keywords => (
                    <div className="item" key={keywords}>
                        <i className="iconfont">&#xeaae;</i>
                        <span className="text" onClick={() => onKeywordsClick(keywords)}>{keywords}</span>
                        <i className="iconfont" onClick={() => onCloseClick(keywords)}>&#xe64c;</i>
                    </div>
                ))
            }
        </div>
    )
}

HistoryList.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
    onKeywordsClick: PropTypes.func.isRequired,
    searchHistory: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default HistoryList