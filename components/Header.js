import React, { Component } from 'react'
import Link from 'next/link'
const linkStyle = {
  marginRight: 15
}

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Link href={this.state.host ? `//${this.state.host}/` : ''}>
          <a style={linkStyle}>Articles</a>
        </Link>
        {this.props.loggedin ? (
          <div>
          <a href={this.state.host ? `//${this.state.host}/users` : ''} style={linkStyle}>Users</a>
          <a href={this.state.host ? `//${this.state.host}/edit` : ''} style={linkStyle}>Edit</a>
          <a href={this.state.host ? `//${this.state.host}/api/logout` : ''} style={linkStyle}>Logout</a>
          </div>
        ):(
          <a href={this.state.host ? `//${this.state.host}/login` : ''} style={linkStyle}>Log In</a>
        )}
        <hr />
      </div>
    )
  }

  componentDidMount() {
    this.setState({host: window.location.host})
  }
}
