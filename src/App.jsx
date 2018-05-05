import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routeConfig from './routes'
import Slidebar from './components/slidebar/Slidebar'
import Play from './containers/Play'

/**
 * 根据路由配置生成相应路由
 * @param {路由配置} routeConfig 
 * @param {父级的路径} parentPath 
 */
function routes(routeConfig, parentPath = '') {
    if (!routeConfig || routeConfig.length === 0) {
        return null
    }

    return (
        routeConfig.map(route => (
            <Route path={parentPath + route.path} key={parentPath + route.path} exact={route.exact} render={(props) => (
                <route.component {...props}>
                    {/* 在父级路由通过 this.props.children 即可添加嵌套路由*/}
                    {routes(route.routes, parentPath + route.path)}
                </route.component>
            )} />
        ))
    )
}

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
