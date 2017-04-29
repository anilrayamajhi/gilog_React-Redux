import React from 'react';
import { Route, IndexRoute, DefaultRoute } from 'react-router';

import App from '../components/app';
import PostsIndex from '../components/posts_index';
import PostsNew from '../components/posts_new';
import BlogPage from '../components/blog_page';


export default (
  <Route path='/' component={App} >
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={BlogPage} />
    {/* <DefaultRoute handler={App} /> */}
  </Route>
);
