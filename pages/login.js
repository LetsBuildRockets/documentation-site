import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.handles = {
      submitHandle: this.submitHandle.bind(this),
      username: React.createRef(),
      password: React.createRef()
    }
  }

  submitHandle(event) {
    event.preventDefault();
    var newUserRequest = new XMLHttpRequest()
    newUserRequest.open('POST', `https://${window.location.host}/api/login`, false)
    newUserRequest.setRequestHeader('Content-type', 'application/json')
    newUserRequest.send(JSON.stringify({ username: this.handles.username.current.value, password: this.handles.password.current.value}))
    window.alert(newUserRequest.responseText)
    console.log(newUserRequest.status)
    if (newUserRequest.status === 201) {
      window.location.href = '/'
    }
  }

  render() {
    return (
      <Layout>
        <h1>Log In</h1>
        <div>
          <form id="login" onSubmit={this.handles.submitHandle}>
            Username: <input type="text" id="username" name="username" placeholder="jackyd" ref={this.handles.username}></input><br />
            Password: <input type="password" id="password" name="password" placeholder="*****" ref={this.handles.password}></input><br />

            <input id="login_submit" type="submit" value="Submit"></input>
          </form>
        </div>
      </Layout>
    )
  }

  componentDidMount() {

  }
}
