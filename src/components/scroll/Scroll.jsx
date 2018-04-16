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

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.props.pullupFunc) {
            this.scroll.on('scrollEnd', () => {
                // 滚动到底部
                if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                    this.props.pullupFunc()
                }
            })
        }
    }

    refresh() {
        this.scroll && this.scroll.refresh()
    }

    render() {
        return (
            <div ref={wrapper => this.wrapper = wrapper} className="scroll">
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
    listenScroll: PropTypes.bool,
    pullupFunc: PropTypes.func
}
