document.getElementById('selection').onchange = function() {
  var e = document.getElementById('selection');
  var selection = e.options[e.selectedIndex].value;

  document.getElementById('user').setAttribute('hidden', '');
  document.getElementById('article').setAttribute('hidden', '');

  document.getElementById(selection).removeAttribute('hidden');
};

var article_tags = new Taggle("article_tags");
var article_needed_tags = new Taggle("article_needed_tags");

document.getElementById('addAuthor').onclick = function() {alert('This\'ll eventually end up being another instance of Taggle.')};
