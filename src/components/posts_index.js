import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


import { fetchPosts } from '../actions/index';

var puke = (obj) => {
  return <pre>{JSON.stringify(obj, null,  ' ')}</pre>
}

class PostIndex extends Component {
  constructor(){
    super();
    this.state = {
      filterTerm: ""
    }
  }

  onInputChange(event){
    // console.log(event.target.value);
    this.setState({
      filterTerm: event.target.value
    })
  }

  onFromSubmit(event) {
      event.preventDefault();

      // this.setState({filterTerm: ''});
  }

  componentWillMount(){
    this.props.fetchPosts();
  }

  renderData(blog) {
    if(!!blog){
      return(
        <tr key={blog.id} >
          <td><Link to={`posts/${blog.id}`}>{blog.title}</Link></td>
          <td>{blog.categories}</td>
        </tr>
      )
    }
  }

  filteredBlog(data){
    let col = [];
    col = this.props.posts.all.map(post => {
      if (post.title.toLowerCase().indexOf(data.toLowerCase()) != -1){
        return post
      };
    });
    // console.log(col);
    return col;
  }

  render(){
    var row  = this.props.posts.all;
    // console.log('Filter term', this.state.filterTerm);

    return(
      <div>
        <form onSubmit={this.onFromSubmit.bind(this)} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
            <input className="mdl-textfield__input" type="text" id="sample3" value={this.state.filterTerm} onChange={this.onInputChange.bind(this)}/>
            <label className="mdl-textfield__label">Search for Blog...</label>
        </form>
        <div className="text-xs-right floating-action">
          <Link to="posts/new">
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
              <i className="material-icons">add</i>
            </button>
          </Link>
        </div>
        <br />
        {/* <h1>List of blogs</h1> */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {/* {puke(this)} */}
            {(!row)?null:(!this.state.filterTerm) ? row.map(this.renderData) : this.filteredBlog(this.state.filterTerm).map(this.renderData)}
          </tbody>
        </table>
        {/* {puke(this.props.posts.all)} */}
      </div>
    )
  }
}

var mapStateToProps = ({ posts }) => {
  return { posts };
}

//  null is for mapStateToProps(), which doesnot exist in this case
export default connect(mapStateToProps, { fetchPosts })(PostIndex);

//  componentWillMount(): React lifecycle method. React will automatically call this function whenever the component is about to get render in the DOM for the first time. It will not be called in subsequent re-renders.
