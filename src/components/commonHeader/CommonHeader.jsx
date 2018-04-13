import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { setSlidebarState } from '../../actions/index'
import './commonHeader.styl'

function CommonHeader(props) {
    let path = props.match.path

    return (
        <div className="common-header">
            <i className="iconfont menu" onClick={() => props.setSlidebarState(true)}>&#xe63d;</i>
            <div>
                <i className={classNames({ iconfont: true, media: true, active: path === '/media' })}>&#xe78f;</i>
                <i className={classNames({ iconfont: true, wangyi: true, active: path === '/home' })}>&#xe650;</i>
                <i className={classNames({ iconfont: true, user: true, active: path === '/user' })}>&#xe60e;</i>
            </div>
            <i className="iconfont search" onClick={() => props.history.push('/search')}>&#xe600;</i>
        </div>
    )
}

export default withRouter(connect(null, { setSlidebarState })(CommonHeader))