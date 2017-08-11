const editFile = () => (
  <div>
    <form id="file" hidden>
      Google Drive Slug: <input type="text" name="slug" placeholder="XxXXXxxXXxxXXXXXxXXxxXXXX"></input><br />
      Filename: <input type="text" name="filename" placeholder="File"></input><br />
      File-type: <input type="text" name="filetype" placeholder=".md"></input><br />
      Thumbnail: <input type="text" name="thumbnail" placeholder="(Link to a photo)"></input><br />
      Description: <textarea name="description" rows="2" placeholder="Markdown Available"></textarea><br />
      Tags: <div id="file_tags" className="taggle_div"></div><br />

      <input type="button" value="Submit"></input>
    </form>
  </div>
)

export default editFile
