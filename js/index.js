let rpsApi = ''

function checkFirstPlayer() {
  rpsApi = document.getElementById('form').elements['server-input'].value.trim()
  if (!rpsApi) return alert('please enter a value')
  if (rpsApi[rpsApi.length - 1] === '/')
    rpsApi = rpsApi.slice(0, rpsApi.length - 1)
  axios
    .get(`${rpsApi}/isFirstPlayer`)
    .then(data => {
      if (data.data) window.location.href = 'pages/playerone.html'
      else window.location.href = 'pages/playertwo.html'
    })
    .catch(err => {
      alert('Could not connect to the server, check console for details.')
      console.log(err)
    })
}
