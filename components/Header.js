import React, { Component } from 'react'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default class extends Component {
  constructor(props){
    super(props);
    console.log("header props:", props);
  }

  render() {
    return (
      <div>
        <Link href="/">
          <a style={linkStyle}>Articles</a>
        </Link>
        {this.props.loggedin ? (
          <div>
          <a href='/users' style={linkStyle}>Users</a>
          <a href='/edit' style={linkStyle}>Edit</a>
          <a href='/api/logout' style={linkStyle}>Logout</a>
          </div>
        ):(
          <a href='/login' style={linkStyle}>Log In</a>
        )}
        <hr />
      </div>
    )
  }
}
