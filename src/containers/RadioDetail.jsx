import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Scroll from '../components/scroll/Scroll'
import CommentList from '../components/commentList/CommentList'
import ProgramList from '../components/programList/ProgramList'
import { getRadioDetail } from '../actions/radio'
import { numFormat } from '../utils/index'
import './radioDetail.styl'

class RadioDetail extends React.Component {
    constructor(props) {
        super(props)

        let id = this.props.match.params.id
        let isMatch = props.radioDetail.id === id

        this.state = {
            id,
            radioDetail: isMatch ? props.radioDetail : {},
            radioPrograms: isMatch ? props.radioPrograms : [],
            currentIndex: 0
        }
    }

    componentDidMount() {
        this.getRadioDetail()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.radioDetail.id === this.state.id) {
            this.setState({
                radioDetail: nextProps.radioDetail,
                radioPrograms: nextProps.radioPrograms
            })
        }
    }

    componentDidUpdate() {
        if (this.tabToggle) {
            this.tabToggle = false
            this.scroll.refresh()
        }
    }

    getRadioDetail() {
        let radioDetail = this.state.radioDetail
        if (Object.keys(radioDetail).length) {
            return
        }

        let id = this.props.match.params.id
        this.props.getRadioDetail(id)
    }

    tabSwitch(index) {
        this.setState({
            currentIndex: index
        })
        this.tabToggle = true
    }

    render() {
        let { currentIndex, radioDetail, radioPrograms } = this.state

        return (
            <div>
                <div className="radio-detail-nav-header">
                    <i className="iconfont back" onClick={() => this.props.history.goBack()}>&#xe606;</i>
                    <div className="title">电台</div>
                    <i className="iconfont shape">&#xe648;</i>
                    <i className="iconfont more">&#xe609;</i>  
                </div>
                <div className="radio-detail-wrapper">
                    {
                        !!Object.keys(radioDetail).length && (
                            <Scroll ref={scroll => this.scroll = scroll}>
                                <div>
                                    <div className="banner" style={{ backgroundImage: `url(${radioDetail.picUrl})`}}>
                                        <div className="content">
                                            <div>
                                                <div className="name">{radioDetail.name}</div>
                                                <div className="count">{numFormat(radioDetail.subCount)}人已订阅</div>
                                            </div>
                                            <div className="sub-btn">
                                                <i className="iconfont">&#xe78c;</i>
                                                <span>&nbsp;&nbsp;订阅</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="radio-tab-wrapper">
                                        <span className={classNames({ active: currentIndex === 0, tab: true })} onClick={() => this.tabSwitch(0)}>详情</span>
                                        <span className={classNames({ active: currentIndex === 1, tab: true })} onClick={() => this.tabSwitch(1)}>
                                            节目
                                            <span className="programCount">{radioDetail.programCount}</span>
                                        </span>
                                        <div className="underline" style={{ transform: `translateX(${currentIndex * 100}%)` }}></div>
                                    </div>
                                    <div style={{ display: currentIndex === 0 ? 'block' : 'none' }}>
                                        <div className="author-info-wrapper">
                                            <div className="title">主播</div>
                                            <div className="info">
                                                <img src={radioDetail.dj.avatarUrl} alt=""/>
                                                <div className="content">
                                                    <div>{radioDetail.dj.nickname}</div>
                                                    <div className="desc" style={{ WebkitBoxOrient: 'vertical' }}>{radioDetail.dj.description}</div>
                                                </div>
                                                <div>
                                                    <div className="reward">赞赏</div>
                                                    <div className="count">{radioDetail.dj.rewardCount}次赞赏</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="radio-info-wrapper">
                                            <div className="title">电台内容简介</div>
                                            <div className="content">
                                                <div>
                                                    <span>分类:&nbsp;</span>
                                                    <span className="category">{radioDetail.category}</span>
                                                </div>
                                                <div className="desc">{radioDetail.desc}</div>
                                            </div>
                                        </div>
                                        <CommentList list={radioDetail.commentDatas} title="精彩评论" />
                                    </div>
                                    <div style={{ display: currentIndex === 1 ? 'block' : 'none' }}>
                                        <div className="program-header">
                                            <span className="programCount">共{radioDetail.programCount}期</span>
                                            <div>
                                                <span>
                                                    <i className="iconfont">&#xe765;</i>
                                                    &nbsp;排序
                                                </span>
                                                <span className="choose">
                                                    <i className="iconfont">&#xe614;</i>
                                                    &nbsp;多选
                                                </span>
                                            </div>
                                        </div>
                                        <ProgramList list={radioPrograms} />
                                    </div>
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
    radioDetail: state.radio.radioDetail,
    radioPrograms: state.radio.radioPrograms
})

export default connect(mapStateToProps, { getRadioDetail })(RadioDetail)