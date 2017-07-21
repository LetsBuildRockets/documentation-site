const createUser = () => (
  <div>
  <form>
    First name: <input type="text" name="first_name" defaultValue="Jack"></input><br></br>
    Last name: <input type="text" name="last_name" defaultValue="Doe"></input><br></br>
    Username: <input type="text" name="username" defaultValue="jackyd"></input><br></br>
    Profile Picture: <input type="text" name="profilepicture" defaultValue="(Link to a photo)"></input><br></br>
    Existing article? <input type="radio" name="article" value="Yes"></input>Yes <input type="radio" name="article" value="No"></input>No<br></br>
    <input type="submit" value="Submit"></input>
  </form>
  </div>
)

export default createUser
