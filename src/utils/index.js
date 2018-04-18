export function numFormat(num) {
    if (num >= 100000) {
        return ~~(num / 100000) + '万'
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