import { IronhackPage } from './app.po';

describe('ironhack App', () => {
  let page: IronhackPage;

  beforeEach(() => {
    page = new IronhackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
