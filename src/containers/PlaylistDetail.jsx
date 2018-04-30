import React from 'react'
import { connect } from 'react-redux'
import SongList from 'components/songList/SongList'
import Scroll from '../components/scroll/Scroll'
import { getPlayList } from '../actions/playList'
import { numFormat } from 'utils/index'
import './playlistDetail.styl'

class PlaylistDetail extends React.Component {
    constructor(props) {
        super(props)

        let id = this.props.match.params.id
        this.state = {
            id: id,
            playList: props.playList.id === id ? props.playList : {}
        }
    }

    componentDidMount() {
        this.getPlayList()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playList.id === this.state.id) {
            this.setState({
                playList: nextProps.playList
            })
        }
    }

    getPlayList() {
        let playList = this.state.playList
        if (Object.keys(playList).length) {
            return
        }

        let id = this.state.id
        this.props.getPlayList(id)
    }

    render() {
        let { playList } = this.state

        return (
            <div>
                <div className="play-list-nav-header">
                    <i className="iconfont back" onClick={() => this.props.history.goBack()}>&#xe606;</i>
                    <div className="content">
                        <div className="name">歌单</div>
                        <div className="info">根据你可能喜欢的风格推荐</div>
                    </div>
                    <i className="iconfont search">&#xe600;</i>
                    <i className="iconfont more">&#xe609;</i>  
                </div>
                <div className="play-list-detail-wrapper">
                    {
                        !!Object.keys(playList).length && (
                            <Scroll>
                                <div style={{ position: 'relative' }}>
                                    <div className="introduce">
                                        <div className="cover-img">
                                            <img src={playList.coverImgUrl} alt=""/>
                                            <span className="count">
                                                <i className="iconfont">&#xe6c8;</i>
                                                &nbsp;{numFormat(playList.playCount)}
                                            </span>
                                        </div>
                                        <div className="content">
                                            <div className="name" style={{ WebkitBoxOrient: 'vertical' }}>{playList.name}</div>
                                            <div className="author">
                                                <img src={playList.creator.avatarUrl} alt=""/>
                                                <span className="nickname">{playList.creator.nickname}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="operation-wrapper">
                                        <span className="item">
                                            <i className="iconfont">&#xe62f;</i>
                                            <span className="text">{numFormat(playList.subscribedCount)}</span>
                                        </span>
                                        <span className="item">
                                            <i className="iconfont">&#xe64b;</i>
                                            <span className="text">{numFormat(playList.commentCount)}</span>
                                        </span>
                                        <span className="item">
                                            <i className="iconfont">&#xe648;</i>
                                            <span className="text">{numFormat(playList.shareCount)}</span>
                                        </span>
                                        <span className="item">
                                            <i className="iconfont">&#xe794;</i>
                                            <span className="text">下载</span>
                                        </span>
                                    </div>
                                    <div className="cover-bg-wrapper">
                                        <div className="cover-bg" style={{ backgroundImage: `url(${playList.coverImgUrl})`}}></div>
                                    </div>
                                    <div className="play-operation">
                                        <div className="left">
                                            <i className="iconfont play">&#xe647;</i>
                                            <span>播放全部</span>
                                            <span className="count">(共{playList.trackCount}首)</span>
                                        </div>
                                        <div className="right">
                                            <i className="iconfont more">&#xe614;</i>
                                            <span>多选</span>
                                        </div>
                                    </div>
                                    <SongList list={playList.tracks} showRank />
                                </div>
                            </Scroll>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    playList: state.playList
})

export default connect(mapStateToProps, { getPlayList })(PlaylistDetail)