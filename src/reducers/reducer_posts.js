import { FETCH_POSTS, FETCH_BLOG } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

//  all: is a list of blog post in index page
//  post: individual blog post

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_POSTS:
    // console.log(action.payload.data);
      return { ...state, all: action.payload.data}

    case FETCH_BLOG:
    // console.log('FETCH_BLOG:  ',action.payload.data);
      return { ...state, post: action.payload.data}

    default:
      return state;
  }
}
