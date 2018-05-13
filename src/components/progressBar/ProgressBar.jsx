import React from 'react'
import PropTypes from 'prop-types'
import './progressBar.styl'

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            percentage: this.props.percentage || 0
        }

        this.touchStart = this.touchStart.bind(this)
        this.touchMove = this.touchMove.bind(this)
        this.touchEnd = this.touchEnd.bind(this)        
    }

    componentDidMount() {
        this.initEvents()
    }

    componentWillReceiveProps(nextProps, props) {
        if (nextProps.percentage !== props.percentage && true) {
            this.setState({
                percentage: nextProps.percentage
            })
        }
    }

    componentWillUnmount() {
        this.point.removeEventListener('touchstart', this.touchStart)
        this.point.removeEventListener('touchstart', this.touchMove)
        this.point.removeEventListener('touchstart', this.touchEnd)
    }

    initEvents() {
        this.point.addEventListener('touchstart', this.touchStart)
        this.point.addEventListener('touchstart', this.touchMove)
        this.point.addEventListener('touchstart', this.touchEnd)
    }

    touchStart() {

    }

    touchMove() {

    }

    touchEnd() {

    }

    render() {
        let { percentage, percentageChangeFunc } = this.props
    
        return (
            <div className="progress-bar-wrapper">
                <div className="percentage"></div>
                <span className="point" ref={point => this.point = point}></span>
            </div>
        )
    }
}

ProgressBar.propTypes = {
    percentage: PropTypes.number,
    percentageChangeFunc: PropTypes.func
}