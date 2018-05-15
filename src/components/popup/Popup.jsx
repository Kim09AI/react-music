import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './popup.styl'

class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show() {
        this.setState({
            show: true
        })
    }

    hide() {
        this.setState({
            show: false
        })
    }
    
    confirmFunc() {
        this.hide()
        this.props.confirmFunc && this.props.confirmFunc()
    }

    cancelFunc() {
        this.hide()
        this.props.cancelFunc && this.props.cancelFunc()
    }

    render() {
        let { show } = this.state
        let { title, info, cancelText, confirmText } = this.props
        
        return (
            <div className={classNames({ 'popup-wrapper': true, active: show })}>
                <div className={classNames({ popup: true, active: show })}>
                    <div className="content">
                        {
                            title && <h3 className="title">{title}</h3>
                        }
                        {
                            info && <div className="info">{info}</div>
                        }
                    </div>
                    <div className="footer">
                        <span className="cancel-btn btn" onClick={() => this.cancelFunc()}>{cancelText}</span>
                        <span className="confirm-btn btn" onClick={() => this.confirmFunc()}>{confirmText}</span>
                    </div>
               </div>
               <div className={classNames({ cover: true, active: show })}></div>
            </div>
        )
    }
}

Popup.defaultProps = {
    cancelText: '取消',
    confirmText: '确定'
}

Popup.propTypes = {
    title: PropTypes.string,
    info: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelFunc: PropTypes.func,
    confirmFunc: PropTypes.func
}

export default Popup