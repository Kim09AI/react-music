import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { search, getSearchSuggest, addSearchHistory, rmSearchHistory } from '../actions/search'
import HistoryList from 'components/historyList/HistoryList'
import TabMenu from 'components/tabMenu/TabMenu'
import Scroll from 'components/scroll/Scroll'
import SongList from 'components/songList/SongList'
import MvList from 'components/mvList/MvList'
import ArtistList from 'components/artistList/ArtistList'
import Loading from 'components/loading/Loading'
import './search.styl'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            probeType: 2,
            keywords: this.props.match.params.keywords || '',
            showHistoryList: !this.props.match.params.keywords,
            loading: false,
            currentIndex: 0,
            tabs: [
                { text: '单曲', type: 1, list: [], count: 0 },
                { text: '视频', type: 1004, list: [], count: 0 },
                { text: '歌手', type: 100, list: [], count: 0 },
                { text: '专辑', type: 10, list: [], count: 0 },
                { text: '歌单', type: 1000, list: [], count: 0 },
                { text: '电台', type: 1009, list: [], count: 0 }
            ]
        }
    }

    componentDidMount() {
        this.state.keywords && this.loadSearchResult()
    }

    componentWillReceiveProps(nextProps, props) {
        if (nextProps.searchResult !== props.searchResult) {
            if (!nextProps.searchResult.list || nextProps.searchResult.list.length === 0) {
                return
            }

            let { currentIndex, tabs } = this.state
            let item = tabs[currentIndex]

            tabs = [...tabs]
            tabs.splice(currentIndex, 1, {
                ...item,
                list: item.list.concat(nextProps.searchResult.list),
                count: nextProps.searchResult.count
            })

            this.setState({
                tabs: tabs
            })
        }
    }

    async loadSearchResult() {
        let { keywords, currentIndex, tabs } = this.state
        let offset = tabs[currentIndex].list.length

        if (offset !== 0 && offset >= tabs[currentIndex].count) { // 已经加载完数据
            return
        }

        this.setState({
            loading: true
        })

        await this.props.search({ keywords, type: tabs[currentIndex].type, offset })

        this.setState({
            loading: false
        })
    }

    goBack() {
        this.props.history.goBack()
    }

    handleChange(e) {
        this.setState({
            keywords: e.target.value
        })
    }

    submit(e) {
        e.preventDefault()

        let keywords = this.state.keywords
        this.addSearchHistory(keywords)

        this.props.history.push(`/search/${encodeURIComponent(keywords)}`)
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
    }

    rmSearchHistory(keywords) {
        this.props.rmSearchHistory(keywords)
    }

    onTabClick(index) {
        let tab = this.state.tabs[index]
        this.setState({
            currentIndex: index
        })

        setTimeout(() => {
            tab.list.length === 0 && this.loadSearchResult()
        }, 0)
    }

    render() {
        let { keywords, showHistoryList, tabs, currentIndex, loading, probeType } = this.state
        let { searchHistory, rmSearchHistory } = this.props

        return (
            <div>
                <form className="search-box" onSubmit={(e) => this.submit(e)}>
                    <i className="iconfont back" onClick={() => this.goBack()}>&#xe606;</i>
                    <input type="text" className="search-input" value={keywords} onChange={(e) => this.handleChange(e)} placeholder="请输入关键词..."/>
                </form>
                {
                    showHistoryList && <HistoryList searchHistory={searchHistory} onKeywordsClick={(keywords) => this.keywordsClick(keywords)} onCloseClick={rmSearchHistory} />
                }
                {
                    !showHistoryList && <TabMenu tabs={tabs} onTabClick={(index) => this.onTabClick(index)} />
                }
                {
                    !showHistoryList && [
                        <div className={classNames({ 'search-result-wrapper': true, active: currentIndex === 0 })} key={tabs[0].type}>
                            <Scroll pullupFunc={() => this.loadSearchResult()} probeType={probeType}>
                                <div>
                                    <SongList list={tabs[0].list} />
                                    <Loading complete={tabs[0].list.length !== 0 && tabs[0].list.length >= tabs[0].count} show={currentIndex === 0 && loading === true} />
                                </div>
                            </Scroll>
                        </div>,
                        <div className={classNames({ 'search-result-wrapper': true, active: currentIndex === 1 })} key={tabs[1].type}>
                            <Scroll pullupFunc={() => this.loadSearchResult()} probeType={probeType}>
                                <div>
                                    <MvList list={tabs[1].list} />
                                    <Loading complete={tabs[1].list.length !== 0 && tabs[1].list.length >= tabs[1].count} show={currentIndex === 1 && loading === true} />
                                </div>
                            </Scroll>
                        </div>,
                        <div className={classNames({ 'search-result-wrapper': true, active: currentIndex === 2 })} key={tabs[2].type}>
                            <Scroll pullupFunc={() => this.loadSearchResult()} probeType={probeType}>
                                <div>
                                    <ArtistList list={tabs[2].list} />
                                    <Loading complete={tabs[2].list.length !== 0 && tabs[2].list.length >= tabs[2].count} show={currentIndex === 2 && loading === true} />
                                </div>
                            </Scroll>
                        </div>
                    ]
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    let search = state.search
    return {
        searchResult: search.searchResult,
        searchHistory: search.history
    }
}

const mapDispatchToProps = {
    search,
    getSearchSuggest,
    addSearchHistory,
    rmSearchHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)