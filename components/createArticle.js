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
          Project Page? <input type="radio" name="article" value="Yes"></input>Yes <input type="radio" name="article" value="No"></input>No<br />
          Tags: <div id="tags"></div><br />
          Needed/Related Tags: <div id="needed_tags"></div><br />

          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
  componentDidMount() {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");
    const script3 = document.createElement("script");
    const script4 = document.createElement("script");
    const style1 = document.createElement("link");

    script1.src = "https://code.jquery.com/jquery-1.10.1.min.js";

    script2.src = "/scripts/jquery-ui-1.10.4.custom.min.js";

    script3.src = "/scripts/taggle.js";

    script4.src = "/scripts/createArticleScript.js";

    style1.href = "styles/taggle.css";
    style1.rel = "stylesheet";
    style1.type = "text/css";

    document.body.appendChild(script1);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(style1);
  }
}
