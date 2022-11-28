import { EventBus } from "./EventBus";

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow: render'
  };

  protected props: Record<string, unknown>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any; };

  constructor(tagName:string = 'div', props: any = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {

  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this._element!.innerHTML = block;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;

    
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
}
