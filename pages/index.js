import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <h1>Users</h1>
    <ul>
      <li>{props.users[0].username} - {props.users[0].first_name} {props.users[0].last_name} (Id: {props.users[0].id})</li>
      <li>{props.users[1].username} - {props.users[1].first_name} {props.users[1].last_name} (Id: {props.users[1].id})</li>
    </ul>
  </Layout>
)

Index.getInitialProps = async function() {
  const db = eval("require('../database')");
  const data = await db.allUsers();

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    users: data
  }
}

export default Index


//  {Array.from(props.users.values()).map((user) => {
//   <li>
//     {user.first_name} {user.last_name}
//   </li>
// })}
