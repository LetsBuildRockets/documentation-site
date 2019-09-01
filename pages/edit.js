const host = process.env.HOST || 'localhost';

import Layout from '../components/editorLayout.js'
import User from '../components/editUser.js'
import Article from '../components/editArticle.js'
import File from '../components/editFile.js'
import {withRouter} from 'next/router'

class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      article: {
        slug: this.props.router.query.slug
      },
      form: {
        contentValue: '',
        abstractValue: ''
      }
    };
    this.handles = {
      contentChangeHandle: this.contentChangeHandle.bind(this),
      abstractChangeHandle: this.abstractChangeHandle.bind(this),
      submitHandle: this.submitHandle.bind(this)
    }
  }

  submitHandle(event) {
    console.log('from:, ', this.state.form)
    alert(this.state.form.contentValue);
    event.preventDefault();
  }

  contentChangeHandle(event) {
    this.setState({...this.state, form: {...this.state.form, contentValue: event.target.value}})
  }

  abstractChangeHandle(event) {
    this.setState({...this.state, form: {...this.state.form, abstractValue: event.target.value}})
  }

  render () {
    return (
      <Layout>
        <User />
        <Article article={this.state.article} handles={this.handles} form={this.state.form}/>
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

    console.log('slug ',this.state.article.slug)
    if(this.state.article.slug) {
      fetch(`https://${host}/api/articles/${this.state.article.slug}`).then((res) => {
        return res.json();
      }).then((json) => {
        const article = (json)[0]
        console.log(article);
        console.log('Fetched article: ', article.title)
        this.setState({article: article})
        this.setState({...this.state, form: {...this.state.form, contentValue: article.content}})
        this.setState({...this.state, form: {...this.state.form, abstractValue: article.abstract}})
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

export default withRouter(Edit)
