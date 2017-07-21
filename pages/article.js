import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Article = (props) => (
    <Layout>
      <h1>{props.article.title}</h1>
      <Link as={`/a/${props.article.author_data.url_slug}`} href={`/article?slug=${props.article.author_data.url_slug}`}>
        <a><h3>{props.article.author_data.first_name} {props.article.author_data.last_name}</h3></a>
      </Link>
      <p>{props.article.content}</p>
    </Layout>
)

Article.getInitialProps = async function (context) {
  const { slug } = context.query
  const res = await fetch(`http://localhost:3000/api/articles/${slug}`)
  const article = (await res.json())[0]
  const res2 = await fetch(`http://localhost:3000/api/users/${article.author_id}`)
  article.author_data = (await res2.json())[0]

  console.log(`Fetched article: ${article.title}`)

  return { article }
}

export default Article
