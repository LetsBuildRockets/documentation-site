import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const User = (props) => (
  <Layout>
    <h1>Users</h1>
    <ul>
      {props.users.map((user) => (
        <li>
          {user.first_name} {user.last_name}
        </li>
      ))}
    </ul>
  </Layout>
)

User.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/allusers')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    users: data
  }
}

export default User
