import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <h1>Articles</h1>
    <ul>
      {props.articles.map((article) => (
        <li key={article.id}>
          <Link as={`/a/${article.url_slug}`} href={`/article?slug=${article.url_slug}`}><a>{article.title}</a></Link> - {article.abstract}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://localhost/api/articles')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    articles: data
  }
}

export default Index
