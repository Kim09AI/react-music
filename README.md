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
需要用`8080`端口启动
```
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

### 友情提示
在手机上安装谷歌浏览器，访问网站后，点击设置，点击添加到主屏幕，就可以像访问app一样在手机上访问项目了，因为`create-react-app`已经集成了`pwa`，意思就是只要上https就可以使用`pwa`的功能了，可以体验一下

### react使用的一些总结
主要还是在react-redux的使用了，数据应该保存在state还是全局的store，主要还是看数据需不需要共享，或者是需不需要缓存，不然存在store反而会使问题变得更麻烦

### 最后
感谢`Binaryify`提供的[NeteaseCloudMusicApi][7]
欢迎`star`或`fork`，有问题或有发现bug页欢迎提`issues`，写的不好的地方也请大佬指点


  [1]: https://react-music.foreversnsd.cn
  [2]: https://github.com/Kim09AI/react-music
  [3]: http://47.106.94.19:3001/images/%E8%81%94%E5%9B%BE%E4%BA%8C%E7%BB%B4%E7%A0%81.png
  [4]: http://47.106.94.19:3001/images/01.gif
  [5]: http://47.106.94.19:3001/images/02.gif
  [6]: http://47.106.94.19:3001/images/03.gif
  [7]: https://github.com/Binaryify/NeteaseCloudMusicApi