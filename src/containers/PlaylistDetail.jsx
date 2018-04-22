import React from 'react'

export default class PlaylistDetail extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id
        console.log(id)
    }

    render() {
        return (
            <div>
                detail
            </div>
        )
    }
}