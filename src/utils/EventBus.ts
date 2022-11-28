export class EventBus {
  private listeners: Record<string, Array<(unknown) => void>> = {};

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    })
  }
}
