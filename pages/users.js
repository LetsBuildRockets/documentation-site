import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const User = (props) => (
  <Layout>
    <h1>Users</h1>
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>
          <Link as={`/a/${user.url_slug}`} href={`/article?slug=${user.url_slug}`}><a>{user.first_name} {user.last_name}</a></Link>
        </li>
      ))}
    </ul>
  </Layout>
)

User.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/users')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    users: data
  }
}

export default User
