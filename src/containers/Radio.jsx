import React from 'react'
import { connect } from 'react-redux'
import RadioThumbnailList from 'components/radiothumbnailList/RadiothumbnailList'
import Scroll from '../components/scroll/Scroll'
import { getRadio } from '../actions/radio'

class Radio extends React.Component {
    componentDidMount() {
        this.props.getRadio()
    }

    render() {
        let { radioRecommendType, radioRecommends } = this.props
        
        return (
            <Scroll>
                <div>
                    <RadioThumbnailList list={radioRecommends} title="电台推荐" />
                    <RadioThumbnailList list={radioRecommendType} title="电台分类推荐" />
                </div>
            </Scroll>
        )
    }
}

const mapStateToProps = state => ({
    radioRecommends: state.radio.radioRecommends,
    radioRecommendType: state.radio.radioRecommendType
})

export default connect(mapStateToProps, { getRadio })(Radio)