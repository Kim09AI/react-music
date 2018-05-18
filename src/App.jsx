import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { routes } from './utils/reactUtil'
import routeConfig from './router'
import Slidebar from './components/slidebar/Slidebar'
import Play from './containers/Play'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {
                            routes(routeConfig)
                        }
                        <Redirect to="/home" />
                    </Switch>
                </Router>
                <Slidebar />
                <Play />
            </div>
        )
    }
}

export default App
