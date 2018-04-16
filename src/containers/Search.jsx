import React from 'react'
import { connect } from 'react-redux'
import { search, getSearchSuggest, addSearchHistory, rmSearchHistory } from '../actions/search'
import HistoryList from 'components/historyList/HistoryList'
import TabMenu from 'components/tabMenu/TabMenu'
import Scroll from 'components/scroll/Scroll'
import SongList from 'components/songList/SongList'
import './search.styl'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: this.props.match.params.keywords || '',
            showHistoryList: !this.props.match.params.keywords,
            type: 1,
            tabs: [
                { text: '单曲', type: 1 },
                { text: '视频', type: 1004 },
                { text: '歌手', type: 100 },
                { text: '专辑', type: 10 },
                { text: '歌单', type: 1000 },
                { text: '电台', type: 1009 }
            ]
        }
    }

    componentDidMount() {
        // this.props.search({ keywords: '少女时' })
        // this.props.getSearchSuggest({ keywords: '少女时' })
        // console.log(this.props)
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
        let { keywords, showHistoryList, tabs } = this.state
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
                            <Scroll>
                                <div>
                                    <SongList />
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
        searchSuggest: search.searchSuggest,
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