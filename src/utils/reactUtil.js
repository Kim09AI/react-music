/**
 * 调用示例
 * 
    export const getHomeData = userId => {
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