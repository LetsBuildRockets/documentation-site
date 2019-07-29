const editUser = () => (
  <div>
    <form id="user" hidden>
      First name: <input type="text" id="edit_user_first_name" name="first_name" placeholder="Jack"></input><br />
      Last name: <input type="text" id="edit_user_last_name"  name="last_name" placeholder="Doe"></input><br />
      Username: <input type="text" id="edit_user_username" name="username" placeholder="jackyd"></input><br />
      Profile Picture: <input id="edit_user_profilepicture" type="text" name="profilepicture" placeholder="(Link to a photo)"></input><br />
      Existing article? <select id="edit_user_has_article" name="has_article"><option value="Yes">Yes</option><option value="No">No</option></select><br />

      <input id="user_submit" type="button" value="Submit"></input>
    </form>
  </div>
)

export default editUser
