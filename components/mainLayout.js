import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedin: false
    }
  }

  render() {
    return (
    <div style={layoutStyle}>
      <Header loggedin={this.state.loggedin}/>
      {this.props.children}
    </div>
    )
  }
  amiloggedin = () => {
    return (
      fetch(`https://${window.location.host}/api/users/me`,{headers: { 'Content-Type': 'application/json' }}).then((res) => {
        return res.json();
      }).then((data) => {
        if (data && data.error) {
          return { 'error': 'Something went wrong' }
        }
        if(typeof data.username !== 'undefined') {
          return true
        } else {
          return false;
        }
      })
    )
  }
  componentDidMount() {
    this.setState({host: window.location.host})
    this.amiloggedin().then((loggedin) => {
      console.log("loggedin:", loggedin);
      this.setState({loggedin: loggedin})
    })
  }
}


export default Layout
