import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {
                        routes.map(route => {
                            if (route.exact) {
                                return <Route path={route.path} key={route.path} exact component={route.component} />
                            } else {
                                return <Route path={route.path} key={route.path} component={route.component} />
                            }
                        })
                    }
                    <Redirect to="/" />
                </Switch>
            </Router>
        )
    }
}

export default App
