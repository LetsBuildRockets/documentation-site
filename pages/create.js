import Layout from '../components/creatorLayout.js'
import User from '../components/createUser.js'

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
        <hr></hr>
        <User />
      </Layout>
    )
  }
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "/scripts/onchange.js";
    script.async = true;

    document.body.appendChild(script);
  }
}
