import React from 'react'
import ReactSwipe from 'react-swipe'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './swipe.styl'

export default class Swipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: this.props.startSlide
        }
    }

    next() {
        this.reactSwipe.next()
        return this
    }

    prev() {
        this.reactSwipe.prev()
        return this
    }

    getPos() {
        return this.reactSwipe.getPos()
    }

    slide(index) {
        this.reactSwipe.slide(index)
        return this
    }

    callback(index, el) {
        this.setState({
            currentIndex: index
        })
        
        this.props.callback(index, el)
    }

    render() {
        if (!this.props.children || !this.props.children.length) {
            return null
        }

        let { currentIndex } = this.state

        return (
            <div className="carousel-wrapper">
                <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} swipeOptions={{ ...this.props, callback: (...args) => this.callback(...args) }}>
                    {this.props.children}
                </ReactSwipe>
                {
                    this.props.showDots && (
                        <div className="dots">
                            {
                                new Array(this.props.children.length).fill(null).map((item, index) => (
                                    <span className={classNames({ dot: true, active: currentIndex === index })} key={index}></span>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

Swipe.defaultProps = {
    startSlide: 0,
    auto: 3000,
    speed: 300,
    disableScroll: false,
    continuous: true,
    showDots: true,
    callback() {},
    transitionEnd() {}
}

Swipe.propTypes = {
    startSlide: PropTypes.number,
    auto: PropTypes.number,
    speed: PropTypes.number,
    disableScroll: PropTypes.bool,
    continuous: PropTypes.bool,
    callback: PropTypes.func,
    transitionEnd: PropTypes.func,
    showDots: PropTypes.bool
}