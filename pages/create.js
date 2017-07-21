import Layout from '../components/creatorLayout.js'

const Create = () => (
  <Layout>
  <form action="/action_page.php">
    <select id="selection" name="editors">
      <option value="article">Article</option>
      <option value="file">File</option>
      <option value="user">User</option>
    </select>
  </form>
  </Layout>
)

export default Create
