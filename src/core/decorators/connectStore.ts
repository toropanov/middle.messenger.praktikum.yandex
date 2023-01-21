import { StoreEvents } from "../../types";
import Store from "../Store";

const store = new Store();

export function connectStore(WrappedBlock, mapStateToProps) {
  return class extends WrappedBlock {
    constructor(props) {
      super({
        ...props,
        ...mapStateToProps(store.getState()),
        dispatch: store.dispatch.bind(store),
      });

      store.on(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(store.getState());
        this.setProps({ ...newState });
      });
    }
  }
}
