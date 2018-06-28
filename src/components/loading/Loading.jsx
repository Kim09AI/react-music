import React from 'react'
import PropTypes from 'prop-types'
import './loading.styl'

function Loading(props) {
    let { complete, show } = props

    return (
        <div className="loading-more" style={{ visibility: complete || show ? 'visible' : 'hidden' }}>
            {
                complete
                    ? <p className="complete">已经到底了</p>
                    : <p className="loading">正在加载...</p>
            }
        </div>
    )
}

Loading.defaultProps = {
    complete: false
}

Loading.propTypes = {
    show: PropTypes.bool.isRequired,
    complete: PropTypes.bool
}

export default Loading