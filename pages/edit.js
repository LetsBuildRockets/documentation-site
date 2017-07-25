import Layout from '../components/creatorLayout.js'
import User from '../components/createUser.js'
import Article from '../components/createArticle.js'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <form>
          <select id="selection" name="editors">
            <option value="article">Article</option>
            <option value="file">File</option>
            <option value="user">User</option>
          </select>
        </form>
        <hr />
        <User />
        <hr />
        <Article />
      </Layout>
    )
  }
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "/scripts/editScript.js";
    script.async = true;

    document.body.appendChild(script);
  }
}
