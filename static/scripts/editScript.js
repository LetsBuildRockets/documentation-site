const host = process.env.HOST || 'localhost';

window.onload = function () {
  setTimeout(() => {
    article_authors._add()
    article_tags._add()
    article_needed_tags._add()
    file_tags._add()
  }, 500)
}

document.getElementById('selection').onchange = function () {
  var e = document.getElementById('selection')
  var selection = e.options[e.selectedIndex].value

  document.getElementById('user').setAttribute('hidden', '')
  document.getElementById('article').setAttribute('hidden', '')
  document.getElementById('file').setAttribute('hidden', '')

  document.getElementById(selection).removeAttribute('hidden')
}

var article_authors = new Taggle('article_authors')
var article_tags = new Taggle('article_tags')
var article_needed_tags = new Taggle('article_needed_tags')
var file_tags = new Taggle('file_tags')

// document.getElementById('article_submit').onclick = attemptSubmitArticle
// document.getElementById('user_submit').onclick = attemptSubmitUser

function getAuthorIDs () {
  var authors = squash(article_authors.getTagValues())
  var authorIDs = []

  for (var n in authors) {
    var authorRequest = new XMLHttpRequest()
    authorRequest.open('GET', `https://${host}/api/users/username/` + authors[n], false)
    authorRequest.send(null)
    console.log(authorRequest.responseText)
    if (authorRequest.responseText === '[]') {
      window.alert(authors[n] + ' isn\'t a legit user, yo!')
      return undefined
    }
    authorIDs.push(authorRequest.responseText)
  }
  return authorIDs
}

function attemptSubmitUser () {
  var data = {}

  data.first_name = document.getElementById('edit_user_first_name').value
  data.last_name = document.getElementById('edit_user_last_name').value
  data.username = document.getElementById('edit_user_username').value
  data.profilepicture = document.getElementById('edit_user_profilepicture').value
  data.has_article = document.getElementById('edit_user_has_article').value

  var newUserRequest = new XMLHttpRequest()
  newUserRequest.open('POST', `https://${host}/api/edit/user`, false)
  newUserRequest.setRequestHeader('Content-type', 'application/json')
  newUserRequest.send(JSON.stringify(data))
  window.alert(newUserRequest.responseText)
}

function attemptSubmitArticle () {
  var authorIDs = getAuthorIDs()
  if (authorIDs === undefined) {
    return false
  }
  var slug = document.getElementById('article_slug').value

  var slugRequest = new XMLHttpRequest()
  slugRequest.open('GET', `https://${host}/api/exists/article/` + slug, false)
  slugRequest.send(null)
  var data = {
    title:  document.getElementById('article_title').value,
    content: document.getElementById('article_content').value,
    abstract: document.getElementById('article_abstract').value,
    thumbnail: document.getElementById('article_thumbnail').value,
    type: document.getElementById('article_type').options[document.getElementById('article_type').selectedIndex].value,
    tags: squash(article_tags.getTagValues()),
    needed_tags: squash(article_needed_tags.getTagValues()),
    author: squash(article_needed_tags.getTagValues()),
    url_slug: document.getElementById('article_slug').value
  }

  console.log(data)

  var articleRequest = new XMLHttpRequest()
  articleRequest.open('POST', `https://${host}/api/edit/article`, false)
  articleRequest.setRequestHeader('Content-type', 'application/json')
  articleRequest.send(JSON.stringify(data))
  window.alert(articleRequest.responseText)
}

// This removes duplicates from arrays
function squash (arr) {
  var tmp = []
  for (var i = 0; i < arr.length; i++) {
    if (tmp.indexOf(arr[i]) === -1) {
      tmp.push(arr[i])
    }
  }
  return tmp
}
