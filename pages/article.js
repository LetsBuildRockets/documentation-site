const host = process.env.HOST || 'localhost';

import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Article = (props) => (
    <Layout>
      <h1>{props.article.title}</h1>
      <h3>By: { props.article.author_url_slug ? (
        <a href = {`/a/${props.article.author_url_slug}`}>{props.article.author_first_name} {props.article.author_last_name}</a>
      ) : (
        `${props.article.author_first_name} ${props.article.author_last_name}`
      )}
      </h3>
      {props.loggedin && (<Link as={`/edit/${props.article.url_slug}`} href={`/edit?slug=${props.article.url_slug}`}><a>Edit</a></Link>)}
      <p>{props.article.content}</p>
    </Layout>
)

function amiloggedin() {
  return (fetch(`https://${host}/api/users/me`,{headers: { 'Content-Type': 'application/json' }}).then((res) => {
    return res.json();
  }).then((data) => {
    if (data && data.error) {
      return { 'error': 'Something went wrong' }
    }
    if(typeof data.username !== 'undefined') {
      return true
    } else {
      return false;
    }
  }))
}

Article.getInitialProps = async function (context) {
  const { slug } = context.query
  const res = await fetch(`https://${host}/api/articles/${slug}`)
  const article = (await res.json())[0]
  console.log(article);
  console.log('Fetched article: ', article.title)

  const loggedin = await amiloggedin();
  return { article, loggedin: loggedin }
}

export default Article
