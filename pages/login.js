import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {

  render() {
    return (
      <Layout>
        <h1>Log In</h1>
        <div>
          <form id="login">
            Username: <input type="text" id="username" name="username" placeholder="jackyd"></input><br />
            Password: <input type="password" id="password" name="password" placeholder="*****"></input><br />

            <input id="login_submit" type="button" value="Submit"></input>
            <script src='/scripts/loginScript.js' />
          </form>
        </div>
      </Layout>
    )
  }

  componentDidMount() {
    // const script1 = document.createElement("script");
    // script1.src = "/scripts/loginScript.js";
    console.log("login script")
    //document.body.appendChild(script1);
    // document.getElementById('login_submit').onclick = login_submit;
    // this.setState({
    //   submitme: login_submit
    // })
  }
}
