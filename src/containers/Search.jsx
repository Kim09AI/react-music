import React from 'react'
import { connect } from 'react-redux'
import { search, getSearchSuggest, addSearchHistory, rmSearchHistory } from '../actions/search'
import HistoryList from 'components/historyList/HistoryList'
import TabMenu from 'components/tabMenu/TabMenu'
import Scroll from 'components/scroll/Scroll'
import SongList from 'components/songList/SongList'
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
            type: 1,
            tabs: [
                { text: '单曲', type: 1, list: [] },
                { text: '视频', type: 1004, list: [] },
                { text: '歌手', type: 100, list: [] },
                { text: '专辑', type: 10, list: [] },
                { text: '歌单', type: 1000, list: [] },
                { text: '电台', type: 1009, list: [] }
            ]
        }
    }

    componentDidMount() {
        this.state.keywords && this.loadSearchResult()
    }

    componentWillReceiveProps(nextProps, props) {
        if (nextProps.searchResult !== props.searchResult) {
            let { type, tabs } = this.state
            let index = tabs.findIndex(item => item.type === type)
            let item = tabs[index]

            tabs = [...tabs]
            tabs.splice(index, 1, {
                ...item,
                list: item.list.concat(nextProps.searchResult)
            })

            this.setState({
                tabs: tabs
            })
        }
    }

    async loadSearchResult() {
        let { keywords, type, tabs, probeType } = this.state
        let offset = tabs[type].list.length

        this.setState({
            loading: true
        })

        await this.props.search({ keywords, type, offset })

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
        let type = this.state.tabs[index].type
        this.setState({
            type
        })
    }

    render() {
        let { keywords, showHistoryList, tabs, type, loading, probeType } = this.state
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
                    !showHistoryList && (
                        <div className="search-result-wrapper">
                            <Scroll pullupFunc={() => this.loadSearchResult()} probeType={probeType}>
                                <div>
                                    <SongList list={tabs[0].list} />
                                    <Loading show={type === tabs[0].type && loading === true} />
                                </div>
                            </Scroll>
                        </div>
                    )
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