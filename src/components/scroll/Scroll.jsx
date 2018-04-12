import React from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './scroll.styl'

export default class Scroll extends React.Component {
    componentDidMount() {
        this.initScroll()
    }
    
    componentDidUpdate() {
        this.refresh()
    }

    componentWillUnmount() {
        this.scroll.destroy()
    }

    initScroll() {
        let { probeType, click, scrollX, listenScroll } = this.props

        this.scroll = new BScroll(this.wrapper, {
            probeType,
            click,
            scrollX,
            listenScroll
        })
    }

    refresh() {
        this.scroll && this.scroll.refresh()
    }

    render() {
        return (
            <div ref={(wrapper => this.wrapper = wrapper)} className="scroll">
                {this.props.children}
            </div>
        )
    }
}

Scroll.defaultProps = {
    probeType: 1,
    click: true,
    scrollX: false,
    listenScroll: false
}

Scroll.propTypes = {
    probeType: PropTypes.number,
    click: PropTypes.bool,
    scrollX: PropTypes.bool,
    listenScroll: PropTypes.bool
}