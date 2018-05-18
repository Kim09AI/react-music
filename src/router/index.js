import { getAsyncComponent } from 'utils/reactUtil'
const Home = getAsyncComponent(() => import(/* webpackChunkName: 'pageHome' */ 'containers/Home'))
const Found = getAsyncComponent(() => import(/* webpackChunkName: 'pageFound' */ 'containers/Found'))
const Mime = getAsyncComponent(() => import(/* webpackChunkName: 'pageMime' */ 'containers/Mime'))
const Radio = getAsyncComponent(() => import(/* webpackChunkName: 'pageRadio' */ 'containers/Radio'))
const Search = getAsyncComponent(() => import(/* webpackChunkName: 'pageSearch' */ 'containers/Search'))
const PlaylistDetail = getAsyncComponent(() => import(/* webpackChunkName: 'pagePlaylistDetail' */ 'containers/PlaylistDetail'))
const RadioDetail = getAsyncComponent(() => import(/* webpackChunkName: 'pageRadioDetail' */ 'containers/RadioDetail'))

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
    },
    {
        path: '/playlistDetail/:id',
        component: PlaylistDetail
    },
    {
        path: '/radioDetail/:rid',
        component: RadioDetail
    }
]

export default routeConfig