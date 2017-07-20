import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.users.map((user) => (
        <li>
          {user.first_name} {user.last_name}
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('http://10.129.90.92:3000/api/allusers')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    users: data
  }
}

export default Index
