export default class extends React.Component {
  render() {
    return (
      <div>
        <form id="article" onSubmit={this.props.handles.submitHandle}>
          Title: <input id="article_title" type="text" name="title" placeholder="Titled Article" defaultValue={this.props.article.title}></input><br />
          Author Username(s): <div id="article_authors" className="taggle_div"></div><br />
          URL Slug: <input id="article_slug" type="text" name="slug" placeholder="titled-article" defaultValue={this.props.article.slug}></input><br />
          Content: <textarea id="article_content" name="content" rows="10" placeholder="Markdown Available" value={this.props.form.contentValue} onChange={this.props.handles.contentChangeHandle}></textarea><br />
          Abstract: <textarea id="article_abstract" name="abstract" rows="2" placeholder="Markdown Available" value={this.props.form.abstractValue} onChange={this.props.handles.abstractChangeHandle}></textarea><br />
          Thumbnail: <input id="article_thumbnail" type="text" name="thumbnail" placeholder="(Link to a photo)" defaultValue={this.props.article.thumbnail}></input><br />
          Type: <select id="article_type" name="type" defaultValue={this.props.article.type}><option value="article">Article</option><option value="project">Project</option><option value="user">User</option></select><br />
          Tags: <div id="article_tags" className="taggle_div"></div><br />
          Needed/Related Tags: <div id="article_needed_tags" className="taggle_div"></div><br />

          <input id="article_submit" type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}
