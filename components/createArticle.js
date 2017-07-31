export default class extends React.Component {
  render () {
    return (
      <div>
        <form id="article">
          Title: <input type="text" name="title" placeholder="Untitled"></input><br />
          Author: <input type="text" name="author" placeholder="You"></input> <button id="addAuthor" type="button">Add Author</button><br />
          Content: <textarea name="content" rows="10" placeholder="Markdown Available"></textarea><br />
          Abstract: <textarea name="abstract" rows="2" placeholder="Markdown Available"></textarea><br />
          Thumbnail: <input type="text" name="thumbnail" placeholder="(Link to a photo)"></input><br />
          Type: <select id="selection" name="type"><option value="article">Article</option><option value="project">Project</option><option value="user">User</option></select><br />
          Tags: <div id="tags" className="taggle_div"></div><br />
          Needed/Related Tags: <div id="needed_tags" className="taggle_div"></div><br />

          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
  componentDidMount() {

  }
}
