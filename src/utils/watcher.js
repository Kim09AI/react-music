class Watcher {
    constructor() {
        this.events = {}
    }

    emit(type, ...args) {
        if (!this.events[type]) {
            return
        }

        this.events[type].forEach(fn => fn(...args))
    }

    on(type, fn) {
        !this.events[type] && (this.events[type] = [])

        this.events[type].push(fn)
    }

    destroy(type, fn) {
        let typeArr = this.events[type]
        if (!typeArr) {
            return
        }

        let index = typeArr.findIndex(value => value === fn)
        return this.events[type].splice(index, 1)[0]
    }
}

export default new Watcher()