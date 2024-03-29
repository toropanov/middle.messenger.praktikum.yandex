import { IDispatch, StoreEvents } from "../../types";
import Store from "../Store";
import Block from "../Block";

import { IState } from "../../types";
import { AConstructorTypeOf } from "../../types";

const store = new Store();

export function connectStore(
  WrappedBlock: AConstructorTypeOf<Block>,
  mapStateToProps: (arg?: unknown) => IState
) {
  return class extends WrappedBlock {
    constructor(props: IState) {
      super({
        ...props,
        ...mapStateToProps(store.getState()),
        dispatch: store.dispatch.bind(store) as IDispatch,
      });

      store.on(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(store.getState());
        this.setProps({ ...newState });
      });
    }
  }
}
