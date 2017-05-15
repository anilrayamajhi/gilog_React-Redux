import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
// import { connect } from 'react-redux';

import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  submitMessage(){
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
          this.context.router.push("/");
        }, 2500)

      }
  }

  render() {
    // console.log('New posts', this.props);
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/">
            <button type="submit" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" >
              <i className="md-36 material-icons">home</i>
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(this.props.createPost)}>
          <h3>Create A New Post</h3>
            <div className="form-group">
              <label>Title</label>
            <input type="text" className="form-control" {...title}/>
          {/* {...title}: using this syntax destructure the title object. Thus, we can access properties(viz. onChange) of title object simply by title.onChange  instead of typing this.props.title.onChange */}
              <div className="text-help">
                {title.touched ? title.error : ''}
              </div>
            </div>
            <div className="form-group">
              <label>Category</label>
            <input type="text" className="form-control" {...categories} required/>
            </div>
            <div className="form-group">
              <label>Content</label>
            <textarea type="text" className="form-control" {...content} required/>
            </div>
            <div className="text-xs-right">
            <button type="submit" className="mdl-button mdl-js-button mdl-button--primary h5" onClick={this.submitMessage.bind(this)}>Submit</button>
            </div>
        </form>
      </div>
    );

  }
}

// form validation
const validate = (values) => {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a username';
  }

  return errors;
}


// Decorate the form component
//  reduxForm helper injects props into components exactly same like connect helper function
//  reduxForm has exact same behaviour as connect
//  connect: first argument => mapStateToProps; second argument => mapDispatchToProps
//  reduxForm:  first argument => form config; second argument => mapStateToProps; third argument => mapDispatchToProps
PostsNew = reduxForm({
  form: 'PostsNewForm', // a unique name for this form
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost } )(PostsNew);


export default PostsNew;
