import React from 'react'
import Scroll from '../components/scroll/Scroll'
import './mime.styl'

export default class Mime extends React.Component {
    render() {
        return (
            <Scroll>
                <div>
                    <div className="user-list">
                        <div className="item">
                            <i className="iconfont">&#xe680;</i>
                            <span className="text">本地音乐</span>
                            <span className="info">(0)</span>
                        </div>
                        <div className="item">
                            <i className="iconfont">&#xe647;</i>
                            <span className="text">最近播放</span>
                            <span className="info">(0)</span>
                        </div>
                        <div className="item">
                            <i className="iconfont">&#xe794;</i>
                            <span className="text">下载管理</span>
                            <span className="info">(0)</span>
                        </div>
                        <div className="item">
                            <i className="iconfont">&#xe605;</i>
                            <span className="text">我的电台</span>
                            <span className="info">(0)</span>
                        </div>
                        <div className="item">
                            <i className="iconfont">&#xe621;</i>
                            <span className="text">我的收藏</span>
                            <span className="info">(专辑/歌手/视频/专栏)</span>
                        </div>
                    </div>
                    <div>
                        <div className="header">
                            <div>
                                <i className="iconfont arrow">&#xe628;</i>
                                <span className="title">创建的歌单(1)</span>
                            </div>
                            <i className="iconfont">&#xe65c;</i>
                        </div>
                        <div className="personalized-list">
                            <div className="item">
                                <div className="icon"></div>
                                <div className="content">
                                    <div className="text">我喜欢的音乐</div>
                                    <div className="num">0&nbsp;首</div>
                                </div>
                                <i className="iconfont">&#xe609;</i>
                            </div>
                        </div>
                    </div>
                </div>
            </Scroll>
        )
    }
}