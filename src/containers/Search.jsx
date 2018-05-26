import React from 'react'
import { connect } from 'react-redux'
import api from 'api'
import Music from 'utils/music'
import { refreshScroll } from 'utils'
import { addMusic } from '../actions/music'
import { getSearchSuggest, addSearchHistory, rmSearchHistory } from '../actions/search'
import HistoryList from 'components/historyList/HistoryList'
import TabMenu from 'components/tabMenu/TabMenu'
import Scroll from 'components/scroll/Scroll'
import SongList from 'components/songList/SongList'
import MvList from 'components/mvList/MvList'
import ArtistList from 'components/artistList/ArtistList'
import AlbumList from 'components/albumList/AlbumList'
import PlayList from 'components/playList/PlayList'
import RadioList from 'components/radioList/RadioList'
import Loading from 'components/loading/Loading'
import Swipe from 'components/swipe/Swipe'
import Alert from 'components/alert/Alert'
import './search.styl'

class Search extends React.Component {
    constructor(props) {
        super(props)

        let matched = this.props.location.search.match(/\d/)
        this.state = {
            probeType: 2,
            keywords: this.props.match.params.keywords || '',
            isSearchResultPage: !!this.props.match.params.keywords,
            loading: false,
            currentIndex: (matched && +matched[0]) || 0,
            tabs: [
                { text: '单曲', type: 1, list: [], count: 0, component: SongList, handler: 'playMusic' },
                { text: '歌单', type: 1000, list: [], count: 0, component: PlayList, path: '/playlistDetail' },
                { text: '电台', type: 1009, list: [], count: 0, component: RadioList, path: '/radioDetail' },
                { text: '视频', type: 1004, list: [], count: 0, component: MvList },
                { text: '歌手', type: 100, list: [], count: 0, component: ArtistList },
                { text: '专辑', type: 10, list: [], count: 0, component: AlbumList }
            ],
            isReady: false
        }
    }

    componentDidMount() {
        this.state.isSearchResultPage && this.loadSearchResult()
    }

    componentDidUpdate(prevProps) {
        this.state.tabs.forEach((item, index) => {
            refreshScroll(this[`scroll${index}`], this.props.showPlay, prevProps.showPlay)
        })
    }

    async loadSearchResult() {
        let { keywords, currentIndex, tabs } = this.state
        let offset = tabs[currentIndex].list.length

        if (offset !== 0 && offset >= tabs[currentIndex].count) { // 已经加载完数据
            return
        }

        if (this[`isLoading${currentIndex}`]) {
            return
        }

        this[`isLoading${currentIndex}`] = true

        this.setState({
            loading: true
        })

        try {
            let res = await api.search({ keywords, type: tabs[currentIndex].type, offset })

            let item = tabs[currentIndex]

            tabs = [...tabs]
            tabs.splice(currentIndex, 1, {
                ...item,
                list: item.list.concat(res.data.searchResult.list),
                count: res.data.searchResult.count
            })

            // 等首次获取到数据后再初始化swipe，以便swipe可以正确计算宽度
            this.setState({
                tabs: tabs,
                isReady: true
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            loading: false
        })

        this[`isLoading${currentIndex}`] = false
    }

    goBack() {
        this.props.history.goBack()
    }

    submit(e) {
        e.preventDefault()

        let keywords = this.input.value
        this.setState({
            keywords
        })
        
        this.addSearchHistory(keywords)

        let path = `/search/${encodeURIComponent(keywords)}`
        this.state.isSearchResultPage ? this.props.history.replace(path) : this.props.history.push(path)
    }

    keywordsClick(keywords) {
        this.addSearchHistory(keywords)

        this.props.history.push(`/search/${encodeURIComponent(keywords)}`)
    }

    addSearchHistory(keywords) {
        keywords = keywords.trim()
        
        if (!keywords) {
            return
        }
        
        this.props.addSearchHistory(keywords)

        if (this.state.isSearchResultPage) {
            setTimeout(() => {
                this.resetState()
                this.loadSearchResult()
            }, 0)
        }
    }

    rmSearchHistory(keywords) {
        this.props.rmSearchHistory(keywords)
    }

    onTabClick(index, isTab = true) {
        let tab = this.state.tabs[index]
        this.setState({
            currentIndex: index
        })

        // 保存tab状态
        this.props.history.replace(`${this.props.match.url}?index=${index}`)

        if (isTab) {
            this.swipe.slide(index)
        }

        setTimeout(() => {
            tab.list.length === 0 && this.loadSearchResult()
        }, 0)
    }

    itemClick(row, col) {
        let { path, handler } = this.state.tabs[col]
        if (path) {
            let id = this.state.tabs[col].list[row].id
            this.props.history.push(path + '/' + id)
            return
        }

        if (handler) {
            this[handler](row)
        }
    }

    async playMusic(index) {
        let song = this.state.tabs[0].list[index]
        try {
            let res = await api.getMusic(song.id)
            let lyrics = res.data.lyrics

            if (!res.data.music.url) {
                this.alert.show('添加歌曲失败,找不到播放地址')
                return
            }
            
            let music = new Music({
                name: song.name,
                id: song.id,
                duration: song.duration,
                artistName: song.artists[0].name,
                picUrl: song.album.picUrl || '/images/notFound.jpg',
                url: `http://music.163.com/song/media/outer/url?id=${res.data.music.id}.mp3`,
                lyric: lyrics.tlyric.lyric || lyrics.lrc.lyric || lyrics.klyric.lyric
            })

            this.props.addMusic(music)
        } catch (e) {
            console.log(e)
        }
    }

    resetState() {
        let tabs = this.state.tabs.map(item => ({
            ...item,
            list: [],
            count: 0
        }))
        
        this.setState({
            tabs,
            currentIndex: 0
        })
        this.swipe.slide(0)
    }

    render() {
        let { keywords, isSearchResultPage, tabs, currentIndex, loading, probeType, isReady } = this.state
        let { searchHistory, rmSearchHistory, showPlay } = this.props

        return (
            <div>
                <form className="search-box" onSubmit={(e) => this.submit(e)}>
                    <i className="iconfont back" onClick={() => this.goBack()}>&#xe606;</i>
                    <input type="text" ref={input => this.input = input} className="search-input" defaultValue={keywords} placeholder="请输入关键词..."/>
                </form>
                {
                    !isSearchResultPage && (
                        <div className="history-scroll-wrapper" style={{ bottom: showPlay ? '50px' : 0 }}>
                            <Scroll ref={historyScroll => this.historyScroll = historyScroll}>
                                <HistoryList searchHistory={searchHistory} onKeywordsClick={(keywords) => this.keywordsClick(keywords)} onCloseClick={rmSearchHistory} />
                            </Scroll>
                        </div>
                    )
                }
                {
                    isSearchResultPage && <TabMenu currentIndex={currentIndex} tabs={tabs} onTabClick={(index) => this.onTabClick(index)} />
                }
                {
                    isSearchResultPage && isReady && (
                        <Swipe continuous={false} auto={0} showDots={false} startSlide={currentIndex} callback={(index) => this.onTabClick(index, false)} ref={swipe => this.swipe = swipe}>
                            {
                                tabs.map((item, index) => (
                                    <div className="search-result-wrapper" style={{ height: showPlay ? 'calc(100vh - 130px)' : 'calc(100vh - 80px)' }} key={item.type}>
                                        <Scroll pullupFunc={() => this.loadSearchResult()} probeType={probeType} ref={scroll => this[`scroll${index}`] = scroll}>
                                            <div>
                                                <item.component list={item.list} onContentClick={(row) => this.itemClick(row, index)} />
                                                <Loading complete={item.list.length !== 0 && item.list.length >= item.count} show={currentIndex === index && loading === true} />
                                            </div>
                                        </Scroll>
                                    </div>
                                ))
                            }
                        </Swipe>
                    )
                }
                <Alert ref={alert => this.alert = alert} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    searchHistory: state.search.history,
    showPlay: state.music.showPlay
})

const mapDispatchToProps = {
    getSearchSuggest,
    addSearchHistory,
    rmSearchHistory,
    addMusic
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)