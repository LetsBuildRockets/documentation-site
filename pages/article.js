import qs from 'qs'; // or your query string parser of choice
import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'next/router'

class Article extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      article: {},
      slug: {}
    }
  }

  render () {
    return (
      <Layout>
        <h1>{this.state.article.title}</h1>
        {this.state.article.author_url_slug !== undefined ? (
          <h3>By: {this.state.article.author_url_slug ? (
            <a href = {`/a/${this.state.article.author_url_slug}`}>{this.state.article.author_first_name} {this.state.article.author_last_name}</a>
          ) : (
            `${this.state.article.author_first_name} ${this.state.article.author_last_name}`
          )}
          </h3>
        ):(
          <div>loading...</div>
        )}
        {this.props.loggedin && (<Link as={`/edit/${this.state.article.url_slug}`} href={`/edit?slug=${this.state.article.url_slug}`}><a>Edit</a></Link>)}
        <p>{this.state.article.content}</p>
      </Layout>
    )
  }

  static getInitialProps({query}) {
    return {query}
  }

  componentDidMount() {
    if(typeof window !== 'undefined') {
      this.setState({host: window.location.host})
    }
    const {slug} = this.props.query
    console.log(this.props.query)
    if(slug !== undefined) {
      fetch(`https://${window.location.host}/api/articles/${slug}`).then((res) => {
        console.log(`fetched https://${window.location.host}/api/articles/${slug}`)
        return res.json();
      }).then((article) => {
        console.log('Fetched article: ', article[0].title)
        console.log(article[0]);
        this.setState({ article: article[0] })
        this.setState({ slug: slug })
      })
    }
  }
}

export default withRouter(Article)
