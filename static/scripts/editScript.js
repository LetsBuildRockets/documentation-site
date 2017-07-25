document.getElementById('selection').onchange = function() {
  var e = document.getElementById('selection');
  var selection = e.options[e.selectedIndex].value;

  document.getElementById('user').setAttribute('hidden', '');
  document.getElementById('article').setAttribute('hidden', '');

  document.getElementById(selection).removeAttribute('hidden');
};
