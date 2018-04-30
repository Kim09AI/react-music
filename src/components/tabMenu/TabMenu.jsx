import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './tabMenu.styl'

export default class TabMenu extends React.Component {
    tabSwitch(index) {
        this.setState({
            currentIndex: index
        })
        this.props.onTabClick(index)
    }

    render() {
        let { tabs, currentIndex } = this.props

        return (
            <div className="tab-wrapper">
                {
                    tabs.map((tab, index) => (
                        <span key={index}
                            className={classNames({ active: currentIndex === index, tab: true })} 
                            style={{ flex: `0 0 ${100 / tabs.length}%`}}
                            onClick={() => this.tabSwitch(index)}
                        >
                            {tab.text}
                        </span>
                    ))
                }
                <div className="underline" style={{ width: `${100 / tabs.length}%`, transform: `translateX(${currentIndex * 100}%)` }}></div>
            </div>
        )
    }
}

TabMenu.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired
    })).isRequired,
    currentIndex: PropTypes.number.isRequired,
    onTabClick: PropTypes.func.isRequired
}