export default class extends React.Component {
  render() {
    return (
      <div>
        <form id="article">
          Title: <input id="article_title" type="text" name="title" placeholder="Titled Article" value={this.props.article.title}></input><br />
          Author Username(s): <div id="article_authors" className="taggle_div"></div><br />
          URL Slug: <input id="article_slug" type="text" name="slug" placeholder="titled-article" value={this.props.article.slug}></input><br />
          Content: <textarea id="article_content" name="content" rows="10" placeholder="Markdown Available" value={this.props.article.content}></textarea><br />
          Abstract: <textarea id="article_abstract" name="abstract" rows="2" placeholder="Markdown Available" value={this.props.article.abstract}></textarea><br />
          Thumbnail: <input id="article_thumbnail" type="text" name="thumbnail" placeholder="(Link to a photo)" value={this.props.article.thumbnail}></input><br />
          Type: <select id="article_type" name="type" value={this.props.article.type}><option value="article">Article</option><option value="project">Project</option><option value="user">User</option></select><br />
          Tags: <div id="article_tags" className="taggle_div" value={this.props.article.tags}></div><br />
          Needed/Related Tags: <div id="article_needed_tags" className="taggle_div" value={this.props.article.needed_tags}></div><br />

          <input id="article_submit" type="button" value="Submit"></input>
        </form>
      </div>
    )
  }
}
