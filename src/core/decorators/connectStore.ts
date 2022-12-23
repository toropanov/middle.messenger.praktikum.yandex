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

      // store.on(StoreEvents.UPDATED, () => {
      //   console.log("UPDATED")
      //   const newState = mapStateToProps(store.getState());
      //   this.setProps({ ...newState });

      //   // state = newState;
      // });
    }

		__onChangeStoreCallback = (newProps) => {
      console.log('CONNECT STORE', this, { newProps })
			this.setProps({ ...this.props, store: window.store });
		};

		componentDidMount(props) {
      console.log('COMPONENT DID MOUNT');
			super.componentDidMount(props);
			store.on(StoreEvents.UPDATED, this.__onChangeStoreCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			store.off(StoreEvents.UPDATED, this.__onChangeStoreCallback);
		}
  }
}
