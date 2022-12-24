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

      // this.__onChangeStoreCallback = this.__onChangeStoreCallback.bind(this);

      store.on(StoreEvents.UPDATED, () => {
        const newState = mapStateToProps(store.getState());
        this.setProps({ ...newState });
      });
    }

    // componentDidMount(props) {
    //   super.componentDidMount(props);
    //   console.log('df')
    // }

		// __onChangeStoreCallback() {
    //   console.log('change callback');
    //   const newState = mapStateToProps(store.getState());
    //   this.setProps({ ...newState });
		// }

		// componentDidMount(props) {
    //   console.log('COMPONENT DID MOUNT');
		// 	super.componentDidMount(props);
		// 	store.on(StoreEvents.UPDATED, () => this.__onChangeStoreCallback);
		// }

		// componentWillUnmount() {
		// 	super.componentWillUnmount();
		// 	store.off(StoreEvents.UPDATED, this.__onChangeStoreCallback);
		// }
  }
}
