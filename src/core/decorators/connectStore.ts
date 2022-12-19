import { StoreEvents } from "../../types";

export function connectStore(WrappedBlock, mapStateToProps) {
  return class extends WrappedBlock {
    constructor(props) {
      super({
        ...props,
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    }

		__onChangeStoreCallback = () => {
			this.setProps({ ...this.props, store: window.store });
		};

		componentDidMount(props) {
			super.componentDidMount(props);
			window.store.on(StoreEvents.UPDATED, this.__onChangeStoreCallback);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			window.store.off(StoreEvents.UPDATED, this.__onChangeStoreCallback);
		}
  }
}
