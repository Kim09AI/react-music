import React from 'react'
import PropTypes from 'prop-types'
import './loading.styl'

function Loading(props) {
    return (
        <div className="loading-more" style={{ visibility: props.show ? 'visible' : 'hidden' }}>
            <p className="loading">正在加载...</p>
        </div>
    )
}

Loading.propTypes = {
    show: PropTypes.bool.isRequired
}

export default Loading