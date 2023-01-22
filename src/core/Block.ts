import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';
import { isEqual } from "../utils/isEqual";
import { IPlainObject, IStateBlock } from '../types';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow: render'
  };

  protected props: IStateBlock;
  protected children: object;
  protected id: string;
  private eventBus: () => EventBus;
  private _element: HTMLElement;
  private _meta: { tagName: string; props: unknown; };

  constructor(tagName = 'div', propsAndChildren = {}) {
    this.id = nanoid();

    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy({ ...props, id: this.id });

    const eventBus = new EventBus();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      if (this._element !== null) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {
    // Переоопределяемый
  }

  public dispatchComponentDidMount() {
    // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: IPlainObject, newProps: IPlainObject) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: IPlainObject, newProps: IPlainObject) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }
    
    return true;
  }

  setProps = (nextProps: IPlainObject) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(element);
      this._element = element;
    }

    this._addEvents();

    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  public render(): DocumentFragment;

  // @ts-ignore
  public getContent() {
    return this.element;
  }

  private _getChildren(propsAndChildren: Record<string, unknown>) {
    const children: { [key: string]: unknown }  = {};
    const props: { [key: string]: unknown } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
  });

    return { children, props };
  }

  private _makePropsProxy(props: { [key: string]: unknown }) {
    const self = this;

    
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop as string] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    })
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  renderTemplate(
    template: (params: unknown) => string,
    propsAndChildren: { [key: string]: unknown }
  ) {
    const { children, props: propsAndStubs } = this._getChildren(propsAndChildren);
    this.children = children;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((ch) => `<div data-id="${ch.id}"></div>`).join('');

        return;
      }

      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="${ch.id}"]`);
          (stub as HTMLElement)?.replaceWith(ch.getContent());
        });

        return fragment.content;
      }

      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      (stub as HTMLElement)?.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}
