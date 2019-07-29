import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = (props) => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Articles</a>
    </Link>
    <Link href="/users">
      <a style={linkStyle}>Users</a>
    </Link>
    <Link href="/edit">
      <a style={linkStyle}>Edit</a>
    </Link>
    <Link href="/login">
      <a style={linkStyle}>Log In</a>
    </Link>
    {props.children}
    <hr />
  </div>
)

export default Header
