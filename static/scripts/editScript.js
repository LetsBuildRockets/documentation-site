document.getElementById('selection').onchange = function() {
  var e = document.getElementById('selection');
  var selection = e.options[e.selectedIndex].value;

  document.getElementById('user').setAttribute('hidden', '');
  document.getElementById('article').setAttribute('hidden', '');
  document.getElementById('file').setAttribute('hidden', '');

  document.getElementById(selection).removeAttribute('hidden');
};

var article_authors = new Taggle("article_authors");
var article_tags = new Taggle("article_tags");
var article_needed_tags = new Taggle("article_needed_tags");
var file_tags = new Taggle("file_tags");

document.getElementById('article_submit').onclick = attemptSubmitArticle;

function getAuthorIDs() {
  var authors = squash(article_authors.getTagValues());
  var authorIDs = [];

  for (var n in authors) {
    var authorRequest = new XMLHttpRequest();
    authorRequest.open("GET", "http://localhost:3000/api/users/username/" + authors[n], false);
    authorRequest.send( null );
    console.log(authorRequest.responseText);
    if (authorRequest.responseText == "[]") {
      window.alert(authors[n] + " isn't a legit user, yo!");
      return undefined;
    }
    authorIDs.push(authorRequest.responseText);
  }
  return authorIDs;
}

function attemptSubmitArticle() {
  var authorIDs = getAuthorIDs();
  if (authorIDs = undefined) {
    return false;
  }
  var slug = document.getElementById("article_slug").value;

  var slugRequest = new XMLHttpRequest();
  slugRequest.open("GET", "http://localhost:3000/api/exists/article/" + slug, false);
  slugRequest.send( null );
  if (slugRequest.responseText == "true") {
    window.alert(slug + " is already being used!");
    return false;
  } else {
    var data = {};

    data.title = document.getElementById('article_title').value;
    data.content = document.getElementById('article_content').value;
    data.abstract = document.getElementById('article_abstract').value;
    data.thumbnail = document.getElementById('article_thumbnail').value;
    var type_selector = document.getElementById('article_type');
    data.type = type_selector.options[type_selector.selectedIndex].value;
    data.tags = squash(article_tags.getTagValues());
    data.needed_tags = squash(article_needed_tags.getTagValues());

    var articleRequest = new XMLHttpRequest();
    articleRequest.open("POST", "http://localhost:3000/api/edit/article", false);
    articleRequest.setRequestHeader("Content-type", "application/json");
    articleRequest.send(data);
    window.alert(articleRequest.responseText);
  }
}

// This removes duplicates from arrays
function squash(arr) {
  var tmp = [];
  for (var i = 0; i < arr.length; i++) {
    if (tmp.indexOf(arr[i]) == -1) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
}
