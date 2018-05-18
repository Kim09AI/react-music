import React from 'react'
import { Route } from 'react-router-dom'

/**
 * 根据路由配置生成相应路由
 * @param {array} routeConfig 路由配置
 * @param {string} parentPath 父级路由
 */
export function routes(routeConfig, parentPath = '') {
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

/**
 * 调用示例
 * 
    export const getHomeData = (userId) => {
        return {
            // 要在之前和之后发送的 action types
            types: {
                requestType: 'requestType', 可选
                successType: 'successType',
                failureType: 'failureType' 可选
            },
            // 检查缓存 (可选):
            shouldCallAPI: state => !state.users[userId],
            // 进行取：
            callAPI: () => fetch(`http://myapi.com/users/${userId}/posts`),
            // 在 actions 的开始和结束注入的参数
            payload: { userId }
        }
    }
 */
export function callAPIMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {}
        } = action

        if (!types) {
            // Normal action: pass it on
            return next(action)
        }
        
        if (types.toString() !== '[object Object]' || types.successType === undefined) {
            throw new Error('Expected an object or property success undefined')
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.')
        }

        if (!shouldCallAPI(getState())) {
            return
        }

        const { requestType, successType, failureType } = types

        requestType && dispatch(
            Object.assign({}, payload, {
                type: requestType
            })
        )

        return callAPI().then(
            response =>
                dispatch(
                    Object.assign({}, payload, {
                        response: response.data, // 简化数据结构层次
                        type: successType
                    })
                ),
            error =>
                failureType && dispatch(
                    Object.assign({}, payload, {
                        error,
                        type: failureType
                    })
                )
        )
    }
}

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
export function getAsyncComponent(load) {
    return class AsyncComponent extends React.Component {
        componentDidMount() {
            load().then(({ default: component }) => {
                this.setState({
                    Component: component
                })
            })
        }

        render() {
            const { Component } = this.state || {}

            return Component ? <Component {...this.props} /> : null
        }
    }
}