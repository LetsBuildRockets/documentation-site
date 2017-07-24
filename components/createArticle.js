const createArticle = () => (
  <div>
  <form>
    Title: <input type="text" name="title" placeholder="Untitled"></input><br></br>
    Author: <input type="text" name="author" placeholder="You"></input> <button type="button" onclick="alert('Pretend this adds another field for an author.')">Add Author</button><br></br>
    Content: <textarea name="content" rows="10" placeholder="Markdown Available"></textarea><br></br>
    Abstract: <textarea name="abstract" rows="2" placeholder="Markdown Available"></textarea><br></br>
    Thumbnail: <input type="text" name="thumbnail" placeholder="(Link to a photo)"></input><br></br>
    Project Page? <input type="radio" name="article" value="Yes"></input>Yes <input type="radio" name="article" value="No"></input>No<br></br>


    <input type="submit" value="Submit"></input>
  </form>
  </div>
)
needed_tags, tags, url_slug
export default createArticle
