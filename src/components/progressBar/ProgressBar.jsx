import React from 'react'
import PropTypes from 'prop-types'
import './progressBar.styl'

const pointW = 14

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: this.props.percentage || 0
        }

        this.touchStart = this.touchStart.bind(this)
        this.touchMove = this.touchMove.bind(this)
        this.touchEnd = this.touchEnd.bind(this)  
        this.refresh = this.refresh.bind(this)      
    }

    componentDidMount() {
        this.initEvents()
    }

    componentWillReceiveProps(nextProps) {
        if (!this.isTouch && nextProps.percentage !== this.props.percentage) {
            this.setState({
                percentage: nextProps.percentage
            })
        }
    }

    componentWillUnmount() {
        this.destoryEvents()
    }

    initEvents() {
        this.point.addEventListener('touchstart', this.touchStart)
        this.point.addEventListener('touchmove', this.touchMove)
        this.point.addEventListener('touchend', this.touchEnd)
        window.addEventListener('resize', this.refresh)
    }

    destoryEvents() {
        this.point.removeEventListener('touchstart', this.touchStart)
        this.point.removeEventListener('touchmove', this.touchMove)
        this.point.removeEventListener('touchend', this.touchEnd)
        window.removeEventListener('resize', this.refresh)
    }

    progressBarClick(e) {
        let pageX = e.pageX
        let { left, width } = this.progressBar.getBoundingClientRect()
        let offsetX = pageX - left - pointW
        let progressW = width - pointW
        let percentage = offsetX / progressW

        this.setState({
            percentage
        })
        
        this.props.percentageChangeFunc(percentage)
    }

    touchStart(e) {
        let startX = e.changedTouches[0].pageX

        this.isTouch = true
        this.startX = startX
        this.startPercentage = this.state.percentage
    }

    touchMove(e) {
        if (!this.isTouch) {
            return
        }

        let moveX = e.changedTouches[0].pageX
        let diffX = moveX - this.startX
        let width = this.progressBar.getBoundingClientRect().width - pointW
        let offsetX = Math.min(Math.max(width * this.startPercentage + diffX, 0), width)

        this.setState({
            percentage: offsetX / width
        })
    }

    touchEnd() {
        this.isTouch = false
        this.props.percentageChangeFunc(this.state.percentage)
    }

    refresh() {
        this.forceUpdate()
    }

    render() {
        let { percentage } = this.state
        let offsetX = 0
        if (this.progressBar) {
            offsetX = (this.progressBar.getBoundingClientRect().width - pointW) * percentage
        }
    
        return (
            <div className="progress-bar-wrapper" onClick={(e) => this.progressBarClick(e)} ref={progressBar => this.progressBar = progressBar}>
                <div className="percentage" style={{ width: `${offsetX}px`}}></div>
                <span className="point" style={{ transform: `translateX(${offsetX}px)`, WebkitTransform: `translate(${offsetX}px, -50%)` }} ref={point => this.point = point}></span>
            </div>
        )
    }
}

ProgressBar.propTypes = {
    percentage: PropTypes.number,
    percentageChangeFunc: PropTypes.func
}