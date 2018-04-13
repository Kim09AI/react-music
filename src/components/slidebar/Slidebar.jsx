import React from 'react'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import { setSlidebarState } from '../../actions/index'
import Scroll from '../scroll/Scroll'
import './slidebar.styl'

class Slidebar extends React.Component {
    render() {
        let { slidebarState, setSlidebarState } = this.props

        return (
            <div className="slidebar-wrapper">
                <Motion style={{ x: spring(slidebarState ? 0 : -100) }}>
                    {
                        ({ x }) => (
                            <div className="content" style={{ transform: `translateX(${x}%)` }}>
                                <Scroll>
                                    <div>
                                        <div className="header">
                                            <div className="text">登录网易云音乐</div>
                                            <div className="text">320K高音质无限下载，手机电脑多端同步</div>
                                            <div>
                                                <span className="login-btn">立即登录</span>
                                            </div>
                                        </div>
                                        <div className="menu">
                                            <div className="item">
                                                <i className="iconfont">&#xe62d;</i>
                                                <span className="text">我的消息</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xe669;</i>
                                                <span className="text">VIP会员</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xe62c;</i>
                                                <span className="text">商城</span>
                                            </div>
                                        </div>
                                        <div className="menu">
                                            <div className="item">
                                                <i className="iconfont">&#xe601;</i>
                                                <span className="text">我的好友</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xe65b;</i>
                                                <span className="text">附近的人</span>
                                            </div>
                                        </div>
                                        <div className="menu">
                                            <div className="item">
                                                <i className="iconfont">&#xe6e0;</i>
                                                <span className="text">个性换肤</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xeaae;</i>
                                                <span className="text">定时停止播放</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xe62c;</i>
                                                <span className="text">扫一扫</span>
                                            </div>
                                            <div className="item">
                                                <i className="iconfont">&#xe62e;</i>
                                                <span className="text">音乐闹钟</span>
                                            </div>
                                        </div>
                                    </div>
                                </Scroll>
                                <div className="footer">
                                    <div className="item">
                                        <i className="iconfont">&#xe633;</i>
                                        <span className="text">夜间模式</span>
                                    </div>
                                    <div className="item">
                                        <i className="iconfont">&#xe65c;</i>
                                        <span className="text">设置</span>
                                    </div>
                                    <div className="item">
                                        <i className="iconfont">&#xe616;</i>
                                        <span className="text">退出</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Motion>
                
                <Motion style={{ opacity: spring(slidebarState ? 1 : 0) }}>
                    {
                        ({ opacity }) => (
                            <div className="cover" onClick={() => setSlidebarState(false)} style={{ opacity, display: opacity === 0 ? 'none' : 'block' }}></div>
                        )
                    }
                </Motion>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    slidebarState: state.slidebarState
})

export default connect(mapStateToProps, { setSlidebarState })(Slidebar)