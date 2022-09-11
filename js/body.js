const rpsApi = 'http://localhost:2198'

let player1Choice
let player2Choice

setInterval(() => {
  axios
    .get(`${rpsApi}/hasChosen/1`)
    .then(res => {
      if (res.data)
        document.getElementById('p1-chosen-status').innerHTML = '\u2714'
      else document.getElementById('p1-chosen-status').innerHTML = ''
    }, 1000)
    .catch(err => console.log(err))
  axios
    .get(`${rpsApi}/hasChosen/2`)
    .then(res => {
      if (res.data)
        document.getElementById('p2-chosen-status').innerHTML = '\u2714'
      else document.getElementById('p2-chosen-status').innerHTML = ''
    }, 1000)
    .catch(err => console.log(err))
}, 1000)

function selRock1() {
  setBorder(1, 'rock')
  player1Choice = 'rock'
}

function selPaper1() {
  setBorder(1, 'paper')
  player1Choice = 'paper'
}

function selScissors1() {
  setBorder(1, 'scissors')
  player1Choice = 'scissors'
}

function selRock2() {
  setBorder(2, 'rock')
  player2Choice = 'rock'
}

function selPaper2() {
  setBorder(2, 'paper')
  player2Choice = 'paper'
}

function selScissors2() {
  setBorder(2, 'scissors')
  player2Choice = 'scissors'
}

function setFirstChoice() {
  axios.post(`${rpsApi}/player1/${player1Choice}`)
  setWinnerStatus()
}
function setSecondChoice() {
  axios.post(`${rpsApi}/player2/${player2Choice}`)
  setWinnerStatus()
}
function setWinnerStatus() {
  axios
    .get(`${rpsApi}/winner`)
    .then(res => {
      document.getElementById('winner-status').innerHTML = res.data
    })
    .catch(error => console.log(error.response.data))
}
function resetChoices() {
  setBorder(0, 'reset')
  document.getElementById('winner-status').innerHTML = ''
  axios.put(`${rpsApi}/reset-choices`).catch(err => console.log(err))
}

function setBorder(player, rps) {
  if (rps == 'rock') {
    document.getElementById(`rock-${player}`).style.border = '2px solid #0099FF'
    document.getElementById(`paper-${player}`).style.border =
      '0px solid #0099FF'
    document.getElementById(`scissors-${player}`).style.border =
      '0px solid #0099FF'
  } else if (rps == 'paper') {
    document.getElementById(`rock-${player}`).style.border = '0px solid #0099FF'
    document.getElementById(`paper-${player}`).style.border =
      '2px solid #0099FF'
    document.getElementById(`scissors-${player}`).style.border =
      '0px solid #0099FF'
  } else if (rps == 'scissors') {
    document.getElementById(`rock-${player}`).style.border = '0px solid #0099FF'
    document.getElementById(`paper-${player}`).style.border =
      '0px solid #0099FF'
    document.getElementById(`scissors-${player}`).style.border =
      '2px solid #0099FF'
  } else if (rps == 'reset') {
    for (i = 1; i < 3; i++) {
      document.getElementById(`rock-${i}`).style.border = '0px solid #0099FF'
      document.getElementById(`paper-${i}`).style.border = '0px solid #0099FF'
      document.getElementById(`scissors-${i}`).style.border =
        '0px solid #0099FF'
    }
  }
}
