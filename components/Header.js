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
