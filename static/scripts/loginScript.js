document.getElementById('login_submit').onclick = login_submit;

function login_submit() {
  var data = {};

  data.username = document.getElementById('username').value;
  data.password = document.getElementById('password').value;

  var newUserRequest = new XMLHttpRequest();
  newUserRequest.open("POST", "https://localhost/api/login", false);
  newUserRequest.setRequestHeader("Content-type", "application/json");
  newUserRequest.send(JSON.stringify(data));
  window.alert(newUserRequest.responseText);
}
