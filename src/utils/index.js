export function numFormat(num) {
    if (num >= 100000) {
        return (num / 10000).toFixed(1) + '万'
    }
    return num
}

export function timeFormat(time) {
    time = ~~(time / 1000)
    let second = time % 60
    let min = ~~(time / 60)
    let hour

    if (min >= 60) {
        hour = ~~(min / 60)
        min = min % 60
    }

    min = padLeft(min)
    second = padLeft(second)

    return hour ? `${hour}:${min}:${second}` : `${min}:${second}`
}

function padLeft(value, str = '0', len = 2) {
    let length = (''+ value).length
    while (length++ < len) {
        value = str + value
    }

    return value
}

export function getDate(time, connectStr = '.') {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return [year, month, day].join(connectStr)
}

export function dateFormat(fmt, date = new Date()) {
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 找到并删除对应项
 * @param {array} list 
 * @param {function} fn 查找函数
 */
export function distinctList(list, fn) {
    let index = list.findIndex(fn)
    if (index === -1) {
        return list
    }

    let _list = list.slice()
    _list.splice(index, 1)

    return _list
}

export const debounce = function(fn, delay = 100, context) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(context, args), delay)
    }
}

/**
 * 刷新scroll组件的高度
 * @param {object} scroll scroll组件实例
 * @param {boolean} showPlay 是否显示mini播放器
 * @param {*} prevShowPlay 组件prevProps的showPlay值
 */
export const refreshScroll = (scroll, showPlay, prevShowPlay) => {
    if (showPlay === prevShowPlay) {
        return
    }

    scroll && scroll.refresh()
}

export const shuffle = (arr) => {
    let _arr = arr.slice()
    _arr.forEach((value, i) => {
        let j = ~~(Math.random() * (i + 1))
        let temp = _arr[j]
        _arr[j] = _arr[i]
        _arr[i] = temp
    })

    return _arr
}

export const modeData = {
    random: {
        text: '随机播放',
        icon: '&#xe64a;'
    },
    order: {
        text: '顺序播放',
        icon: '&#xe66d;'
    },
    loop: {
        text: '单曲循环',
        icon: '&#xe66e;'
    }
}