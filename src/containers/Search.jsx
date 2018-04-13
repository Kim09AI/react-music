import React from 'react'
import { connect } from 'react-redux'
import { search, getSearchSuggest } from '../actions/search'

class Search extends React.Component {
    componentDidMount() {
        this.props.search({ keywords: 'snsd' })
        this.props.getSearchSuggest({ keywords: '少女时代' })
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = state => ({
    searchResult: state.searchResult,
    searchSuggest: state.searchSuggest
})

const mapDispatchToProps = {
    search,
    getSearchSuggest
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)