import Block from '../core/Block';

jest.mock('nanoid', () => {
  return { nanoid: () => null };
});

class MockPage extends Block {
  static componentName = 'MockPage';

  render() {
    return this.renderTemplate(() => '<div>Mocked element</div>', {});
  }
}


describe('Block', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
  });

  it('Render', () => {
    const block = new MockPage();
    block.show();

    expect(block.element.style.display).toBe('block');
  });

  it('Hide rendered element', () => {
    const block = new MockPage();
    block.hide();

    expect(block.element.style.display).toBe('none');
  });
});
