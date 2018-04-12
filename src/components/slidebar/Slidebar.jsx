import React from 'react'
import { connect } from 'react-redux'
import { setSlidebarState } from '../../actions/index'
import Scroll from '../scroll/Scroll'
import './slidebar.styl'

class Slidebar extends React.Component {
    render() {
        return (
            <div className="slidebar-wrapper">
                <div className="content">
                    <Scroll>
                        <div>
                            <div>
                                <div>登录网易云音乐</div>
                                <div>320K高音质无限下载，手机电脑多端同步</div>
                                <div>
                                    <span>立即登录</span>
                                </div>
                            </div>
                            <div className="menus">

                            </div>
                        </div>
                    </Scroll>
                </div>
                <div className="cover" onClick={() => this.props.setSlidebarState(false)}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    slidebarState: state.slidebarState
})

export default connect(mapStateToProps, { setSlidebarState })(Slidebar)