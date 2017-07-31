import Layout from '../components/editorLayout.js'
import User from '../components/editUser.js'
import Article from '../components/editArticle.js'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <User />
        <Article />
      </Layout>
    )
  }
  componentDidMount() {
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

    style1.href = "styles/taggle.css";
    style1.rel = "stylesheet";
    style1.type = "text/css";

    style2.href = "styles/forms.css";
    style2.rel = "stylesheet";
    style2.type = "text/css";

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(style1);
    document.body.appendChild(style2);
  }
}
