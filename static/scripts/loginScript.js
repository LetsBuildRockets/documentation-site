document.getElementById('login_submit').onclick = loginSumbit

function loginSumbit () {
  var data = {}

  data.username = document.getElementById('username').value
  data.password = document.getElementById('password').value

  var newUserRequest = new XMLHttpRequest()
  newUserRequest.open('POST', `https://${host}/api/login`, false)
  newUserRequest.setRequestHeader('Content-type', 'application/json')
  newUserRequest.send(JSON.stringify(data))
  window.alert(newUserRequest.responseText)
  console.log(newUserRequest.status)
  if (newUserRequest.status === 201) {
    window.location.href = '/'
  }
}
