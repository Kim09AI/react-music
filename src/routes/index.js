import Home from 'containers/Home'
import Found from 'containers/Found'
import Mime from 'containers/Mime'
import Radio from 'containers/Radio'
import Search from 'containers/Search'

const routeConfig = [
    {
        path: '/home',
        component: Home,
        routes: [
            {
                path: '/',
                component: Found,
                exact: true
            },
            {
                path: '/mime',
                component: Mime
            },
            {
                path: '/radio',
                component: Radio
            }
        ]
    },
    {
        path: '/search',
        component: Search,
        exact: true
    },
    {
        path: '/search/:keywords',
        component: Search
    }
]

export default routeConfig