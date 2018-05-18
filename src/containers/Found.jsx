import React from 'react'
import { connect } from 'react-redux'
import Scroll from '../components/scroll/Scroll'
import Swipe from '../components/swipe/Swipe'
import ThumbnailList from '../components/thumbnailList/ThumbnailList'
import { getHomeData } from '../actions/home'
import { refreshScroll } from 'utils'
import './found.styl'

class Found extends React.Component {
    componentDidMount() {
        this.props.getHomeData()
    }

    componentDidUpdate(prevProps) {
        refreshScroll(this.scroll, this.props.showPlay, prevProps.showPlay)
    }

    onItemClick(index) {
        let id = this.props.personalized[index].id
        
        this.props.history.push(`/playlistDetail/${id}`)
    }

    render() {
        let { banners, personalized } = this.props
        
        return (
            <Scroll ref={scroll => this.scroll = scroll}>
                <div>
                    <Swipe>
                        {
                            banners.map((banner, index) => (
                                <div className="item" key={index}>
                                    <div className="pic" style={{ backgroundImage: `url(${banner.pic})`}}></div>
                                    <span className="theme" style={{ backgroundColor: banner.titleColor }}>{banner.typeTitle}</span>
                                </div>
                            ))
                        }
                    </Swipe>
                    <div className="recommend-list">
                        <div className="item">
                            <span className="border">
                                <i className="iconfont">&#xe6e8;</i>
                            </span>
                            <div className="text">私人FM</div>
                        </div>
                        <div className="item">
                            <span className="border">
                                <i className="iconfont">&#xe673;</i>
                            </span>
                            <div className="text">开启每日推荐</div>
                        </div>
                        <div className="item">
                            <span className="border">
                                <i className="iconfont">&#xe642;</i>
                            </span>
                            <div className="text">歌单</div>
                        </div>
                        <div className="item">
                            <span className="border">
                                <i className="iconfont">&#xe7bd;</i>
                            </span>
                            <div className="text">排行榜</div>
                        </div>
                    </div>
                    {
                        <ThumbnailList onClick={(index) => this.onItemClick(index)} title="推荐歌单" list={personalized} showNum={9} />
                    }
                </div>
            </Scroll>
        )
    }
}

const mapStateToProps = state => ({
    banners: state.homeData.banners,
    personalized: state.homeData.personalized,
    showPlay: state.music.showPlay
})

const mapDispatchToProps = {
    getHomeData
}

export default connect(mapStateToProps, mapDispatchToProps)(Found)