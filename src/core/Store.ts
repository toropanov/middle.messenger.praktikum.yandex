import { EventBus } from "./EventBus";
import { StoreEvents } from '../types';

class Store extends EventBus {
  private state = {};

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }

  public setState(newState) {
    const nextState = {
      ...this.state,
      ...newState
    }

    this.state = { ...nextState };
    this.emit(StoreEvents.UPDATED);
  }

  dispatch(nextStateOrAction, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.setState({ ...this.state, ...nextStateOrAction });
    }
  }
}

export default new Store();
