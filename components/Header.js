import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
      <Link href="/">
        <a style={linkStyle}>Articles</a>
      </Link>
      <Link href="/users">
        <a style={linkStyle}>Users</a>
      </Link>
  </div>
)

export default Header
