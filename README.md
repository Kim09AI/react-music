# react-music
本来没打算写网易云音乐的，好像都已经被大家写烂了，不过没办法，暂时想不到其他的可写，加上网易云音乐又有API，还可以基于restful API做一层graphql的处理再提供给前端调用，然后才决定用react写了这个仿app版网易云音乐

### 技术栈
- react
- react-router
- redux
- react-redux
- react-motion
- better-scroll
- ES6/7
- stylus
- koa
- graphql

### 实现的功能
- 发现页
- 我的
- 电台页
- 侧边栏
- 歌单内页
- 电台内页
- 搜索页及结果页
- 上一首
- 下一首
- 播放模式切换
- 歌曲删除
- 歌词
- 左右滑切歌

### 运行
```
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
```
这是网易云API，因为最新的banner数据已经改了，可以`git reset --hard d155a1fc0177e525cb650d239b8a98a8549a85e1`回退到这次提交
```
cross-env PORT=8080 npm start
```
首先启动api服务器，需要用`8080`端口启动
```
git clone git@github.com:Kim09AI/react-music.git

# dev模式
# 先启动graphql服务器
$ cd server && npm run dev
# 再回到根目录
$ npm start

# production模式
# 首次build前先执行(因为使用了dll)
$ npm run build:dll
$ npm run build
# 本地以production模式启动服务器
cd server && npm start
```

### 预览
[线上地址][1]
[github地址][2]
移动端预览
![此处输入图片的描述][3]
还是来几张动图，大概看看
![此处输入图片的描述][4]![此处输入图片的描述][5]![此处输入图片的描述][6]

# 一些细节
### 路由配置
react并没有像vue那样，可以通过配置routes数组对象，就会帮我们生成好路由，那要是想像vue一样使用，就得自己动手来实现一个了
```js
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
```
调用方式
```js
<Router>
    <Switch>
        {
            routes(routeConfig)
        }
        <Redirect to="/home" />
    </Switch>
</Router>
```
对应的routeConfig配置
```js
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
```
其实主要的还是如何配置嵌套路由，核心是在配置Route时不使用`component`，而是使用`render`，把嵌套路由作为`this.props.children`传进去，然后还要在父级组件添加`{this.props.children}`即可

### 路由懒加载
react不像vue一样，可以在设置Route的component的时候返回一个promise，等resolve后再路由跳转，这里我使用的是通过一个高阶组件，在这个高阶组件的`componentDidMount`中去懒加载的
```js
componentDidMount() {
    load().then(({ default: component }) => {
        this.setState({
            Component: component
        })
    })
}
```
懒加载主要就是为了更快的加载首屏，但是在react中有这样一个问题，因为不能在component处返回一个promise，一切换路由就会马上跳转到高阶组件，而`componentDidMount`时才开始加载真正需要的组件，这样的话要是没加`loading`就可能会造成白屏的现象，然后就想到了这种方法,通过`prefetch`预取异步chunk，利用浏览器的空闲时间去下载指定的内容,然后缓存起来,这样下次加载时,就直接从缓存中取出来,从而有效降低白屏时间或无白屏时间
```js
<link rel="prefetch" href="/static/js/pagePlaylistDetail.910ef6d3.chunk.js">
```
这里用了一个插件`preload-webpack-plugin`，添加以下配置到`config/webpack.config.prod.js`的plugins中即可
```js
new PreloadWebpackPlugin({
  rel: 'prefetch'
}),
```

### 移动端无法autoplay
刚开始是使用网上广为流传的`touchstart`来处理的，在我手机的其他浏览器都是可以的，结果反而是谷歌浏览器不支持，然后换成`touchend`就都可以了

### 友情提示
在手机上安装谷歌浏览器，访问网站后，点击设置，点击添加到主屏幕，就可以像访问app一样在手机上访问项目了，因为`create-react-app`已经集成了`pwa`，意思就是只要上https就可以使用`pwa`的功能了，可以体验一下

# react使用的一些总结
主要还是在react-redux的使用了，数据应该保存在state还是全局的store，主要还是看数据需不需要共享，或者是需不需要缓存，不然存在store反而会使问题变得更麻烦

# 最后
感谢`Binaryify`提供的[NeteaseCloudMusicApi][7]
欢迎`star`或`fork`，有问题或有发现bug页欢迎提`issues`，写的不好的地方也请大佬指点


  [1]: https://react-music.foreversnsd.cn
  [2]: https://github.com/Kim09AI/react-music
  [3]: http://47.106.94.19:3001/images/%E8%81%94%E5%9B%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.png
  [4]: http://47.106.94.19:3001/images/01.gif
  [5]: http://47.106.94.19:3001/images/02.gif
  [6]: http://47.106.94.19:3001/images/03.gif
  [7]: https://github.com/Binaryify/NeteaseCloudMusicApi