import Layout from '../components/mainLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Login = (props) => (
  <Layout>
    <h1>Log In</h1>
    <div>
      <form id="login">
        Username: <input type="text" id="username" name="username" placeholder="jackyd"></input><br />
        Password: <input type="password" id="password" name="password" placeholder="*****"></input><br />

        <input id="login_submit" type="button" value="Submit"></input>
      </form>
    </div>
    <script type="text/javascript" src="/scripts/loginScript.js"></script>
  </Layout>
)

Login.getInitialProps = async function() {
  return {
  }
}

export default Login
