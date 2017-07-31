document.getElementById('selection').onchange = function() {
  var e = document.getElementById('selection');
  var selection = e.options[e.selectedIndex].value;

  document.getElementById('user').setAttribute('hidden', '');
  document.getElementById('article').setAttribute('hidden', '');

  document.getElementById(selection).removeAttribute('hidden');
};

var tags = new Taggle("tags");
var needed_tags = new Taggle("needed_tags");

document.getElementById('addAuthor').onclick = function() {alert('Pretend this adds another field for an author.')};
