import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Article = (props) => (
    <Layout>
      <h1>{props.article.title}</h1>
      {props.article.content}
      <img src={props.article.image.medium}/>
    </Layout>
)

Article.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`http://localhost:3000/api/articles/${id}`)
  const article = await res.json()

  console.log(`Fetched article: ${article.name}`)

  return { article }
}

export default Article
