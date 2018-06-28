import React from 'react'
import { connect } from 'react-redux'
import SongList from 'components/songList/SongList'
import Scroll from '../components/scroll/Scroll'
import api from 'api'
import { addMusic } from '../actions/music'
import { numFormat, refreshScroll } from 'utils'
import Music from 'utils/music'
import watcher from 'utils/watcher'
import './playlistDetail.styl'

class PlaylistDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            playList: {}
        }
    }

    componentDidMount() {
        this.getPlayList()
    }

    componentDidUpdate(prevProps) {
        refreshScroll(this.scrollWrapper, this.scroll, this.props.showPlay, prevProps.showPlay)
    }

    async getPlayList() {
        try {
            let res = await api.getPlayList(this.state.id)

            this.setState({
                playList: res.data.playList
            })
        } catch (e) {
            console.log(e)
        }
    }

    async playMusic(index) {
        let song = this.state.playList.tracks[index]
        try {
            let res = await api.getMusic(song.id)
            let lyrics = res.data.lyrics

            if (!res.data.music.url) {
                watcher.emit('showMessage', '添加歌曲失败,找不到播放地址')
                return
            }
            
            let music = new Music({
                name: song.name,
                id: song.id,
                duration: song.duration,
                artistName: song.artists[0].name,
                picUrl: song.album.picUrl,
                url: `http://music.163.com/song/media/outer/url?id=${res.data.music.id}.mp3`,
                lyric: lyrics.tlyric.lyric || lyrics.lrc.lyric || lyrics.klyric.lyric
            })

            this.props.addMusic(music)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let { playList } = this.state
        let { showPlay } = this.props

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
                <div className="play-list-detail-wrapper" style={{ bottom: showPlay ? '50px' : 0 }}>
                    {
                        !!Object.keys(playList).length && (
                            <Scroll ref={scroll => this.scroll = scroll}>
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
                                    <SongList list={playList.tracks} showRank onContentClick={(index) => this.playMusic(index)} />
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
    showPlay: state.music.showPlay
})

export default connect(mapStateToProps, { addMusic })(PlaylistDetail)