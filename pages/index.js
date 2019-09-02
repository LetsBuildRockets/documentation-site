import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    }
  }
  render() {
    return (
       <Layout>
        <h1>Articles</h1>
        <ul>
          {this.state.articles.map((article) => (
            <li key={article.id}>
              <Link as={`/a/${article.url_slug}`} href={`/article?slug=${article.url_slug}`}><a>{article.title}</a></Link> - {article.abstract}
            </li>
          ))}
        </ul>
      </Layout>
    )
  }

  componentDidMount() {
    fetch(`https://${window.location.host}/api/articles`).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(`Show data fetched. Count: ${data.length}`)
      this.setState({ articles: data })
    })
  }
}

export default Index
