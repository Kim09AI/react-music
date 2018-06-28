import React from 'react'
import classNames from 'classnames'
import watcher from 'utils/watcher'
import './alert.styl'

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            msg: ''
        }
        this.transitionEnd = this.transitionEnd.bind(this)
        this.show = this.show.bind(this)
    }

    componentDidMount() {
        this.alert.addEventListener('webkitTransitionEnd', this.transitionEnd)
        watcher.on('showMessage', this.show)
    }

    componentWillUnmount() {
        this.alert.addEventListener('webkitTransitionEnd', this.transitionEnd)
        watcher.destroy('showMessage', this.show)
    }

    transitionEnd() {
        this.alert.style.display = 'none'
    }

    show(msg) {
        this.setState({
            show: true,
            msg
        })

        this.alert && (this.alert.style.display = 'block')

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.hide()
        }, 2000)
    }

    hide() {
        this.setState({
            show: false
        })
    }

    render() {
        return <div className={classNames({ 'alert-wrapper': true, hide: !this.state.show })} ref={alert => this.alert = alert}>{this.state.msg}</div>
    }
}

export default Alert