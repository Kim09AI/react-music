import React from 'react'
import PropTypes from 'prop-types'
import './commentList.styl'

export default function CommentList(props) {
    let { title, list } = props

    if (list.length === 0) {
        return null
    }

    return (
        <div className="comment-list-wrapper">
            <div className="title">{title}</div>
            <div>
                {
                    list.map(item => (
                        <div key={item.commentId} className="item">
                            <div className="user">
                                <img src={item.userProfile.avatarUrl} alt=""/>
                                <div className="name">{item.userProfile.nickname}</div>
                            </div>
                            <div className="content">{item.content}</div>
                            <div className="program-name">——{item.programName}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

CommentList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        programName: PropTypes.string,
        content: PropTypes.string,
        commentId: PropTypes.string,
        userProfile: PropTypes.shape({
            nickname: PropTypes.string,
            avatarUrl: PropTypes.string
        })
    })).isRequired,
    title: PropTypes.string.isRequired
}