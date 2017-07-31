import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const formStyle = {
  display: 'inline-block'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header>
      <form id="editors" style={formStyle}>
        <select id="selection" name="editors">
          <option value="article">Article</option>
          <option value="file">File</option>
          <option value="user">User</option>
        </select>
      </form>
    </Header>
    {props.children}
  </div>
)

export default Layout
