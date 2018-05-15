import React from 'react'
import './alert.styl'

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            msg: ''
        }
        this.transitionEnd = this.transitionEnd.bind(this)
    }

    componentDidMount() {
        this.alert.addEventListener('webkitTransitionEnd', this.transitionEnd)
    }

    componentWillUnmount() {
        this.alert.addEventListener('webkitTransitionEnd', this.transitionEnd)
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
        return <div className="alert-wrapper" ref={alert => this.alert = alert}>{this.state.msg}</div>
    }
}

export default Alert