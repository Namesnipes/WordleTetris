

var impressible = false
var resetNext = false

var currentLetterPlace = 0 // 0-4
var currentRowNum = 0
var currentGuess = ""

var words = []
var debug = ""
var answer = ""
var answers = []
var len = 0
fetch('js/answers.txt')
  .then(response => response.text())
  .then(atext => {
    answers = atext.split(/\r?\n/);
    answer = debug || answers[Math.floor(Math.random()*answers.length)].replace(/\s/g, "");
    fetch('js/words' + answer.length + ".txt")
    .then(response => response.text())
    .then(text => {
      words = text.split(/\r?\n/);
      console.log(words)
      len = answer.length
      var board = document.getElementById("board")
      board.style['grid-template-columns'] = "75px ".repeat(answer.length);
      console.log("75px ".repeat(answer.length));
      var letter = document.getElementsByClassName("letter0")[0]
      for(var i = 1; i < (answer.length * 6); i++){
        var newletter = letter.cloneNode()
        newletter.className = "letter" + i
        board.appendChild(newletter)
      }
  })
  })

function colorKeyBoard(colorList){
  for(var i = 0; i < 25; i++){
    var key = 'abcdefghijklmnopqrstuvwxyz'[i]
    var keyInAnswer = currentGuess.indexOf(key)
    var elem = getKeyElement(key)
    if(keyInAnswer != -1){
      var color = colorList[keyInAnswer]
      if(color == 'white') color = 'black'
      elem.style['background-color'] = color
    }
  }

  function getKeyElement(key){
    var keys = document.getElementsByClassName("key")
    for(var i = 0; i < keys.length; i++){
      if(keys[i].innerText == key.toUpperCase()){
        return keys[i]
      }
    }
  }

}

function informUser(str){
  document.getElementById("word").innerText = str
}

function clearBox(num) {
  var place = document.getElementsByClassName('letter' + (num))[0]
  place.innerText = ""
}

function clearRow(num) { //row num 0-n
  var start = (num * 5)
  for (var i = start; i < start + 5; i++) {
    var place = document.getElementsByClassName('letter' + i)[0]
    place.innerText = ""
  }
}

function colorRow(colors) {
  for (var i = 0; i < len; i++) {
    document.getElementsByClassName('letter' + ((currentRowNum * len) + i))[0].style["background-color"] = colors[i]
    console.log(document.getElementsByClassName('letter' + ((currentRowNum * len) + i)))
  }
}

function isWord(word){
  for(var i = 0; i < words.length; i++){
    if(word == words[i]){
      return true;
    }
  }
  for(var i = 0; i < answers.length; i++){
    if(word == answers[i]){
      return true;
    }
  }
  return false
}

function getLetterColors(answer, word) {
  var colors = []

  for (var i = 0; i < len; i++) {
    if(word[i] == answer[i]){
      colors[i] = "green"
      answer = answer.slice(0, i) + "-" + answer.slice(i + 1)
    }
  }
  for (var i = 0; i < len; i++) {
    var letter = word[i]
    if ((answer[i] != letter) && answer.includes(letter)) {
      var whereIsIt = answer.indexOf(letter)
      if(!colors[i]) colors[i] = "yellow"
      answer = answer.slice(0, whereIsIt) + "-" + answer.slice(whereIsIt + 1)
    }
  }

  for (var i = 0; i < len; i++) {
    if (colors[i] == null) {
      colors[i] = "white"
    }
  }
  return colors
}
