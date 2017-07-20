import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Article = (props) => (
    <Layout>
      <h1>{props.article.title}</h1>
      <Link as={`/${author.url_slug}`} href={`/article?id=${author.id}`}>
        <h2>{props.author.first_name} {props.author.first_name}</h2>
      </Link>

      {props.article.content}

    </Layout>
)

Article.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const article = await res.json()

  console.log(`Fetched article: ${article.title}`)

  return { article }
}

export default Article
