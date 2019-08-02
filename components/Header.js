import React, { Component } from 'react'
import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

export default class extends Component {

  constructor(props){
    super(props);
    this.state = {};
    this.state.login_out = (
      <Link href="/login">
        <a style={linkStyle}>Log In</a>
      </Link>
    )
  }

  async componentDidMount(ctx) {
    try {
      var res = await fetch('https://localhost/api/users/me',{headers: { 'Content-Type': 'application/json' }});
      var data = await res.json();
      if (data && data.error) {
        return { 'error': 'Something went wrong' }
      }
      console.log(data);
      if(typeof data.username !== 'undefined') {
        this.setState({
          login_out: (
            <a href='/api/logout' style={linkStyle}>Logout</a>
          )
        })
      }
    } catch(error) {
      console.log(error);
    }
  }

  render(props) {
    return (
      <div>
        <Link href="/">
          <a style={linkStyle}>Articles</a>
        </Link>
        <Link href="/users">
          <a style={linkStyle}>Users</a>
        </Link>
        <Link href="/edit">
          <a style={linkStyle}>Edit</a>
        </Link>
        {this.state.login_out}
        <hr />
      </div>
    )
  }
}
//
// Header.getInitialProps = async function (context) {
//   const { slug } = 2
//   const res = await fetch(`https://localhost/api/articles/${slug}`)
//   const article = (await res.json())[0]
//   const res2 = await fetch(`https://localhost/api/users/id/${article.author_id}`)
//   article.author_data = (await res2.json())[0]
//
//   console.log(`Fetched article: ${article.title}`)
//
//   return { article }
//   // try {
//   //   let url = ctx.req ? ctx.req.protocol + '://' + ctx.req.get('host') : '';
//   //   const res = await fetch(url + '/',{
//   //     headers: {
//   //       cookie: ctx.req ? ctx.req.headers.cookie : null ,
//   //     }
//   //   })
//   //   const json = await res.json()
//   //     if (json && json.error) {
//   //       return { 'error': 'Something went wrong' }
//   //     }
//   //     return {
//   //       login :
//   //         <Link href="/login">
//   //           <a style={linkStyle}>Log In</a>
//   //         </Link>
//   //     }
//   // } catch(error){
//   //   console.log(error);
//   // }
// }

//export default Header
