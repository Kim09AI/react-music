import React from 'react'
import { connect } from 'react-redux'
import RadioThumbnailList from 'components/radiothumbnailList/RadiothumbnailList'
import Scroll from '../components/scroll/Scroll'
import { getRadio } from '../actions/radio'
import { setScrollBottom } from 'utils'

class Radio extends React.Component {
    componentDidMount() {
        this.props.getRadio()
    }

    componentDidUpdate(prevProps) {
        setScrollBottom(null, this.scroll, this.props.showPlay, prevProps.showPlay)
    }

    itemClick(id) {
        this.props.history.push(`/radioDetail/${id}`)
    }

    render() {
        let { radioRecommendType, radioRecommends } = this.props
        
        return (
            <Scroll ref={scroll => this.scroll = scroll}>
                <div>
                    <RadioThumbnailList list={radioRecommends} title="电台推荐" onItemClick={(id) => this.itemClick(id)} />
                    <RadioThumbnailList list={radioRecommendType} title="电台分类推荐" onItemClick={(id) => this.itemClick(id)} />
                </div>
            </Scroll>
        )
    }
}

const mapStateToProps = state => ({
    radioRecommends: state.radio.radioRecommends,
    radioRecommendType: state.radio.radioRecommendType,
    showPlay: state.music.showPlay
})

export default connect(mapStateToProps, { getRadio })(Radio)