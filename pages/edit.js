import Layout from '../components/editorLayout.js'
import User from '../components/editUser.js'
import Article from '../components/editArticle.js'
import File from '../components/editFile.js'

class Edit extends React.Component {
  constructor(props){
    super(props);
    console.log("props:", props)
    this.state = {
      article: {
        slug: props.url.query.slug
      }
    }
  }

  render () {
    return (
      <Layout>
        <User />
        <Article article={this.state.article}/>
        <File />
      </Layout>
    )
  }

  componentDidMount(context) {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");
    const script3 = document.createElement("script");
    const script4 = document.createElement("script");
    const style1 = document.createElement("link");
    const style2 = document.createElement("link");

    script1.src = "https://code.jquery.com/jquery-1.10.2.min.js";

    script2.src = "https://code.jquery.com/ui/1.10.4/jquery-ui.min.js";
    script2.defer = true;

    script3.src = "/scripts/taggle.js";

    script4.src = "/scripts/editScript.js";
    script4.defer = true;

    style1.href = "/styles/taggle.css";
    style1.rel = "stylesheet";
    style1.type = "text/css";

    style2.href = "/styles/editor.css";
    style2.rel = "stylesheet";
    style2.type = "text/css";

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(style1);
    document.body.appendChild(style2);

    if(this.state.article.slug) {
      fetch(`https://localhost/api/articles/${this.state.article.slug}`).then((res) => {
        return res.json();
      }).then((json) => {
        const article = (json)[0]
        console.log(article);
        console.log('Fetched article: ', article.title)
        this.setState({article: article})
        setTimeout(function(){
          document.getElementById('article_authors').getElementsByTagName('input')[0].value = article.author_username;
          document.getElementById('article_needed_tags').getElementsByTagName('input')[0].value = article.needed_tags;
          document.getElementById('article_tags').getElementsByTagName('input')[0].value = article.tags;
        },100)
      })
      //document.getElementById('article_title').value = article.title
    }
  }
}

export default Edit
