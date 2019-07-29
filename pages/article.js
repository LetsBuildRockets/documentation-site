import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Article = (props) => (
    <Layout>
      <h1>{props.article.title}</h1>
      <h3>By: <Link as={`/a/${props.article.author_data.url_slug}`} href={`/article?slug=${props.article.author_data.url_slug}`}>
        <a>{props.article.author_data.first_name} {props.article.author_data.last_name}</a>
      </Link></h3>
      <p>{props.article.content}</p>
    </Layout>
)

Article.getInitialProps = async function (context) {
  const { slug } = context.query
  const res = await fetch(`https://localhost/api/articles/${slug}`)
  const article = (await res.json())[0]
  const res2 = await fetch(`https://localhost/api/users/id/${article.author_id}`)
  article.author_data = (await res2.json())[0]

  console.log(`Fetched article: ${article.title}`)

  return { article }
}

export default Article
