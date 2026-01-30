class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, ...rest) {
    if (this.events[event]?.length) {
      this.events[event].forEach((callback) => callback(...rest));
    }
  }

  once(event, callback) {
    const context = this || globalThis;
    function execute(...args) {
      const result = callback.apply(context, args);
      execute.remove();
      return result;
    }
    this.on(event, execute);
  }

  remove(event, callback) {
    if (this.events[event]?.length) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}
