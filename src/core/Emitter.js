 export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомления
    // Добавляем нового слушателя
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}


// EXAMPLE
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('roman', data => console.log('Sub:', data))
// emitter.emit('123123', 42)
//
// setTimeout(() => {
//     emitter.emit('roman', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('roman', 'After 4 seconds')
// }, 4000)