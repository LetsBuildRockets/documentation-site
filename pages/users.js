const host = process.env.HOST || 'localhost';

import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  render() {
    return (
      <Layout>
        <h1>Users</h1>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>
              <Link as={`/a/${user.url_slug}`} href={`/article?slug=${user.url_slug}`}><a>{user.first_name} {user.last_name}</a></Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }

  componentDidMount() {
    fetch(`https://${host}/api/users`).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.setState({
        users: json
      })
    });
  }
}
