export function connectStore(WrappedBlock, mapStateToProps) {
  return class extends WrappedBlock {
    constructor(props) {
      super({
        ...props,
        ...mapStateToProps(window.store.getState()),
        dispatch: window.store.dispatch.bind(window.store),
      });
    }
  }
}
