import { EventBus } from "./EventBus";
import { IStore, IState, StoreEvents, IDispatch } from '../types';

class Store extends EventBus {
  private state: IStore = {
    user: null,
    activeChain: null,
    chains: null,
    version: Math.random()
  };
  static __instance: Store;

  constructor() {
    super();

    if (Store.__instance) {
      return Store.__instance;
    }

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public setState(newState: IState) {
    const nextState = {
      ...this.state,
      ...newState,
      ...newState.activeChain && {
        activeChain: {
          ...this.state.activeChain,
          ...newState.activeChain
        }
      }
    }

    this.state = { ...nextState };
    this.emit(StoreEvents.UPDATED);
  }

  public dispatch(nextStateOrAction: IState | IDispatch, payload?: IState) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), payload, this.state);
    } else {
      this.setState({ ...this.state, ...nextStateOrAction });
    }
  }
}

export default Store;
