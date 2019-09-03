import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      unauthorized: false
    }
  }

  render() {
    return (
      <Layout>
        <h1>Users</h1>
        {this.state.unauthorized ? (
          <>unauthorized</>
        ):(
          <>
            {this.state.users.length > 0 ? (
              <ul>
                {this.state.users.map((user) => (
                  <li key={user.username}>
                    <Link as={`/a/${user.url_slug}`} href={`/article?slug=${user.url_slug}`}><a>{user.first_name} {user.last_name}</a></Link>
                  </li>
                ))}
              </ul>
            ):(
              <>loading...</>
            )}
          </>
        )}
      </Layout>
    )
  }

  componentDidMount() {
    fetch(`https://${window.location.host}/api/users`).then((response) => {
      if(response.status == 200) {
        return response.json();
      } else {
        return { unauthorized: true }
      }
    }).then((json) => {
      if(json.unauthorized === true) {
        this.setState({
          unauthorized: true
        })
      } else {
        this.setState({
          users: json
        })
      }
    });
  }
}
