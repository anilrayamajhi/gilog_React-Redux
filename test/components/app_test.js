import { renderComponent , expect } from '../test_helper';
// import App from '../../src/components/app';
import BlogPage from '../../src/components/blog_page';

describe('BlogPage' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(BlogPage);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
});
