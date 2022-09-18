let rpsApi = 'http://localhost:2199'

let player1Choice
let player2Choice
let player1Submitted = false
let player2Submitted = false

setInterval(async () => {
  const res1 = await axios.get(`${rpsApi}/hasChosen/1`)
  if (res1.data) {
    document.getElementById('p1-chosen-status').src = '../img/finished.png'
  } else if (res2.data === false) {
    document.getElementById('p1-chosen-status').src = '../img/picking.svg'
  }

  const res2 = await axios.get(`${rpsApi}/hasChosen/2`)
  if (res2.data) {
    document.getElementById('p2-chosen-status').src = '../img/finished.png'
  } else if (res2.data === false) {
    document.getElementById('p2-chosen-status').src = '../img/picking.svg'
  }

  if (res1.data && res2.data) {
    const res = await axios.get(`${rpsApi}/winner`)
    resetChoices()
    setTimeout(async () => {
      document.getElementById('winner-status').innerHTML = `Result: ${
        res.data.winner === 0
          ? 'Tie'
          : res.data.winner === 1
          ? 'Player 1 Won'
          : 'Player 2 Won'
      }`
      document.getElementById('p1-chosen-status').src = `${
        res.data.choice1 === 'rock'
          ? '../img/rock.png'
          : res.data.choice1 === 'paper'
          ? '../img/paper.png'
          : '../img/scisssors.png'
      }`
      document.getElementById('p2-chosen-status').src = `${
        res.data.choice2 === 'rock'
          ? '../img/rock.png'
          : res.data.choice2 === 'paper'
          ? '../img/paper.png'
          : '../img/scisssors.png'
      }`
      await axios.put(`${rpsApi}/resetChoices`)
    }, 3000)
  }
}, 1000)

function setServer() {
  rpsApi = document.getElementById('server-form').elements['server-input'].value
  document.getElementById('server-form').style.display = 'none'
}

function resetChoices() {
  setBorder(1, 'reset')
  setBorder(2, 'reset')
  player1Submitted = false
  player2Submitted = false
}

function selRock1() {
  if (player1Submitted) return
  document.getElementById('p1-confirm').disabled = false
  setBorder(1, 'rock')
  player1Choice = 'rock'
}

function selPaper1() {
  if (player1Submitted) return
  document.getElementById('p1-confirm').disabled = false
  setBorder(1, 'paper')
  player1Choice = 'paper'
}

function selScissors1() {
  if (player1Submitted) return
  document.getElementById('p1-confirm').disabled = false
  setBorder(1, 'scissors')
  player1Choice = 'scissors'
}

function selRock2() {
  if (player2Submitted) return
  document.getElementById('p2-confirm').disabled = false
  setBorder(2, 'rock')
  player2Choice = 'rock'
}

function selPaper2() {
  if (player2Submitted) return
  document.getElementById('p2-confirm').disabled = false
  setBorder(2, 'paper')
  player2Choice = 'paper'
}

function selScissors2() {
  if (player2Submitted) return
  document.getElementById('p2-confirm').disabled = false
  setBorder(2, 'scissors')
  player2Choice = 'scissors'
}

function setFirstChoice() {
  player1Submitted = true
  document.getElementById('p1-confirm').disabled = !0
  axios.post(`${rpsApi}/player1/${player1Choice}`)
}
function setSecondChoice() {
  player2Submitted = true
  document.getElementById('p2-confirm').disabled = !0
  axios.post(`${rpsApi}/player2/${player2Choice}`)
}

function setBorder(player, rps) {
  if (rps == 'rock') {
    document.getElementById(`rock-${player}`).style.border = '2px solid #0099FF'
    document.getElementById(`paper-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`scissors-${player}`).style.border =
      '2px dashed #696969'
  } else if (rps == 'paper') {
    document.getElementById(`rock-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`paper-${player}`).style.border =
      '2px solid #0099FF'
    document.getElementById(`scissors-${player}`).style.border =
      '2px dashed #696969'
  } else if (rps == 'scissors') {
    document.getElementById(`rock-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`paper-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`scissors-${player}`).style.border =
      '2px solid #0099FF'
  } else if (rps == 'reset') {
    document.getElementById(`rock-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`paper-${player}`).style.border =
      '2px dashed #696969'
    document.getElementById(`scissors-${player}`).style.border =
      '2px dashed #696969'
  }
}
