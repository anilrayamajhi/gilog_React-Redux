import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchBlog, deleteBlog } from '../actions/index';

var puke = (obj) => {
  return <pre>{JSON.stringify(obj, null,  ' ')}</pre>
}


class BlogPage extends Component {
  constructor(props) {
      super(props);
      this.props.posts.post = {}
    }


  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  componentWillMount(){
      this.props.fetchBlog(this.props.params.id);
  }

  deleteBlogFunc(){
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Blog!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(255,64,129)",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        closeOnCancel: false,
      },
      function(isConfirm){
          if (isConfirm) {
              swal({
                title: "Deleted!",
                text: "Your blog has been deleted.",
                type: "success",
                showConfirmButton: false,
                timer: 1700,
              });

            delBlog();
          } else {
            swal({
              title: "Cancelled",
              text: "Your Blog is safe :)",
              type: "error",
              showConfirmButton: false,
              timer: 1700,
            });
          };
        }
      )

        // function() {
        //   // Redirect the user
        // // console.log(this.props);
        //   this.props.deleteBlog(this.props.params.id);
        //   window.location.href = "/";
        // }
    var delBlog = () => {
      // console.log(this.props);
      this.props.deleteBlog(this.props.params.id);
      setTimeout(() => {
        this.context.router.push('/');
      }, 700);
    }
  }

  render(){
    const POST = this.props.posts.post;

    if(!POST){
      return (<div className="loadStyle col-sm-offset-4 col-md-4">
        <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    </div>)
    }

    return(
      <div>
        <div className="text-xs-right">
          <Link to="/">
            <button type="submit" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" >
              <i className="material-icons">home</i>
            </button>
          </Link>
        </div>
        {/* {puke(POST)} */}
        <button type="submit" className="mdl-button mdl-js-button mdl-button--icon mdl-button--accent mdl-js-ripple-effect">
      </button>
        {this.renderData(POST)}
        <div className="text-xs-right">
              <a href="#" onClick={this.deleteBlogFunc.bind(this)}>
                <i className="md-37 material-icons">delete_forever</i>
              </a>
        </div>
      </div>
    )
  }

  renderData(data){
      return(
        <div>
          <h1 className="h1-styles">{data.title}</h1>
          <div className="text-xs-right div-styles"><strong>{data.categories}</strong></div>
          <div className="div1-styles">{data.content}</div>
        </div>
      )
  }
}

var mapStateToProps = ({ posts }) => {
  return { posts };
}


export default connect(mapStateToProps, { fetchBlog, deleteBlog })(BlogPage);
