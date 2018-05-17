import React from 'react'
import { connect } from 'react-redux'
import CommonHeader from '../components/commonHeader/CommonHeader'
import TabMenu from '../components/tabMenu/TabMenu'
import { setScrollBottom } from 'utils'
import './home.styl'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [
                { path: '/home', text: '发现' },
                { path: '/home/mime', text: '我的' },
                { path: '/home/radio', text: '电台' }
            ]
        }
    }

    componentDidUpdate(prevProps) {
        setScrollBottom(this.scrollWrapper, null, this.props.showPlay, prevProps.showPlay)
    }

    onTabClick(index) {
        let path = this.state.tabs[index].path
        this.props.history.push(path)
    }

    currentIndex() {
        let { pathname } = this.props.location
        let index = this.state.tabs.findIndex(tab => pathname === tab.path)
        return index
    }

    render() {
        return (
            <div>
                <CommonHeader />
                <TabMenu tabs={this.state.tabs} currentIndex={this.currentIndex()} onTabClick={(index) => this.onTabClick(index)} />
                <div className="scroll-wrapper" style={{ bottom: this.props.showPlay ? '50px' : 0 }}>
                    {/* 添加嵌套路由 */}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    showPlay: state.music.showPlay
})

export default connect(mapStateToProps)(Home)