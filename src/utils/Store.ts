import { EventBus } from "./EventBus";
import { StoreEvents } from '../types';

class Store extends EventBus {
  private state = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }
}

export default new Store();
