import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="text-xs-center"><img src={'../style/image-heading.png'} alt="GILOG" /></h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
