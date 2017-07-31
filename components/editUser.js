const editUser = () => (
  <div>
    <form id="user" hidden>
      First name: <input type="text" name="first_name" placeholder="Jack"></input><br />
      Last name: <input type="text" name="last_name" placeholder="Doe"></input><br />
      Username: <input type="text" name="username" placeholder="jackyd"></input><br />
      Profile Picture: <input type="text" name="profilepicture" placeholder="(Link to a photo)"></input><br />
      Existing article? <input type="radio" name="article" value="Yes"></input>Yes <input type="radio" name="article" value="No"></input>No<br />
      <input type="submit" value="Submit"></input>
    </form>
  </div>
)

export default editUser
