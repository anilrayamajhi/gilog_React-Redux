import axios from 'axios';
import { browserHistory } from 'react-router';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_BLOG = 'FETCH_BLOG';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

// console.log("GANEY NODE_ENV", process.env.NODE_ENV);
const ROOT_URL = '/api';
// const API_KEY = '?key=12345678987654321';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}


export const fetchBlog = (BlogId) => {
  const request = axios.get(`${ROOT_URL}/posts/${BlogId}`)
// console.log('BLOG Request', request);
  return {
    type: FETCH_BLOG,
    payload: request
  }
}


export const createPost = (props) => {
  console.log("Find Context",props);
  const request = axios.post(`${ROOT_URL}/posts/`, props);
  submitMessage();
  return {
    type: CREATE_POST,
    payload: request
  }
}

export const deleteBlog = (BlogId) => {
  const request = axios.delete(`${ROOT_URL}/posts/${BlogId}`)
// console.log('BLOG Request', request);
  return {
    type: DELETE_POST,
    payload: request
  }
}


const submitMessage = () => {
  swal({
    title: "Posting Blog",
    text: "Click on OK to view post!",
    // type: "success",
    // confirmButtonText: 'OK',
    type: "info",
    showLoaderOnConfirm: true,
    closeOnConfirm: false,
    confirmButtonColor: "rgb(255,64,129)"
  },function(){
        swal(
          {
          title: "Blog Archived!",
          confirmButtonColor: "rgb(255,64,129)",
          timer: 1700
          });
      redirectRoute();
    });

    var redirectRoute = () => {
      setTimeout(() => {
        browserHistory.push('/')
      }, 1400);
    }
}
