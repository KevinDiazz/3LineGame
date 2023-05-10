let menu = document.getElementsByClassName("menuNumPerson");
let screenGame = document.getElementsByClassName("screenGame");
let players1 = document.getElementsByClassName("one");
let players2 = document.getElementsByClassName("two");
let buttonPanel = document.getElementsByTagName("button");
let buttonChooseX = document.getElementsByClassName("X");
let buttonChooseO = document.getElementsByClassName("O");
let menuChoose = document.getElementsByClassName("menuElegir");
let result = document.getElementsByClassName("showWinner")
let message= document.getElementsByClassName("result")
let titleGame= document.getElementsByClassName("tituloGame")
let playAgainButton = document.getElementsByClassName("resetButton")
let minHeigth=document.getElementsByClassName("minHeigth")

let panel = [
  ["0", "0", "0"],
  ["0", "0", "0"],
  ["0", "0", "0"],
];

let checkPlays = [
  [[panel[0][0] + panel[1][1] + panel[2][2]], [0, 1, 2], [0, 1, 2]], //diagonal
  [[panel[0][2] + panel[1][1] + panel[2][0]], [0, 1, 2], [2, 1, 0]], //diagonal
  [[panel[0][0] + panel[1][0] + panel[2][0]], [0, 1, 2], [0, 0, 0]], //vertical
  [[panel[0][1] + panel[1][1] + panel[2][1]], [0, 1, 2], [1, 1, 1]], //vertical
  [[panel[0][2] + panel[1][2] + panel[2][2]], [0, 1, 2], [2, 2, 2]], //vertical
  [[panel[0][0] + panel[0][1] + panel[0][2]], [0, 0, 0], [0, 1, 2]], //horizontal
  [[panel[1][0] + panel[1][1] + panel[1][2]], [1, 1, 1], [0, 1, 2]], //horizontal
  [[panel[2][0] + panel[2][1] + panel[2][2]], [2, 2, 2], [0, 1, 2]], //horizontal
];

let turn = ["X", "O"];

let buttonPc = {
  "00": 0,
  "01": 1,
  "02": 2,
  "10": 3,
  "11": 4,
  "12": 5,
  "20": 6,
  "21": 7,
  "22": 8,
};

players1[0].addEventListener("click", function () {
  menu[0].style.display = "none";
  menuChoose[0].style.display = "flex";
  titleGame[0].style.display = "none"
});

players2[0].addEventListener("click", function () {
  menu[0].style.display = "none";
  screenGame[0].style.display = "flex";
  titleGame[0].style.display = "block"
  for (let i = 0; i < buttonPanel.length; i++) {
    buttonPanel[i].addEventListener("click", function () {
      if (buttonPanel[i].innerHTML.length == 0) {
        buttonPanel[i].style.color = turn[0] == "X" ? "red" : "blue";
        buttonPanel[i].innerText = turn[0];
        turn.push(turn[0]);
        buttonPanel[i].style.fontSize = "3rem";
        let move = buttonPanel[i].getAttribute("class");
        updatePanel(move, turn[0]);
        winner(turn[0]);
        turn.shift();
      }
    });
  }
});

buttonChooseX[0].addEventListener("click", function () {
  screenGame[0].style.display = "flex";
  menuChoose[0].style.display = "none";
  titleGame[0].style.display = "block"
  let icon = "X";
  let oponent = "O";
  let count = 0;
  for (let i = 0; i < buttonPanel.length; i++) {
    buttonPanel[i].addEventListener("click", function () {
      if (buttonPanel[i].innerHTML.length == 0 && count % 2 == 0) {
        count++;
        buttonPanel[i].innerText = icon;
        buttonPanel[i].style.fontSize = "3rem";
        let move = buttonPanel[i].getAttribute("class");
        updatePanel(move, icon);
        setTimeout(() => {
          count++;
        }, 2000);
        movePc(checkPlays, oponent); 
          winner(icon);
      }
    });
  }
});

buttonChooseO[0].addEventListener("click", function () {
  screenGame[0].style.display = "flex";
  menuChoose[0].style.display = "none";
  titleGame[0].style.display = "block";
  let icon = "O";
  let oponent = "X";
  let count = 0;
  for (let i = 0; i < buttonPanel.length; i++) {
    buttonPanel[i].addEventListener("click", function () {
      if (buttonPanel[i].innerHTML.length == 0 && count % 2 == 0) {
        count++;
        buttonPanel[i].style.color = "red";
        buttonPanel[i].innerText = icon;
        buttonPanel[i].style.fontSize = "3rem";
        let move = buttonPanel[i].getAttribute("class");
        updatePanel(move, icon);
        setTimeout(() => {
          count++;
        }, 2000);
        movePc(checkPlays,oponent);
      }
    });
  }
});

playAgainButton[0].addEventListener("click",function(){
  location.reload();
})

function updatePanel(move, player) {
  switch (move) {
    case "panel1":
      panel[0][0] = player;
      break;

    case "panel2":
      panel[0][1] = player;
      break;

    case "panel3":
      panel[0][2] = player;
      break;

    case "panel4":
      panel[1][0] = player;

      break;
    case "panel5":
      panel[1][1] = player;
      break;

    case "panel6":
      panel[1][2] = player;
      break;

    case "panel7":
      panel[2][0] = player;
      break;

    case "panel8":
      panel[2][1] = player;
      break;

    case "panel9":
      panel[2][2] = player;
      break;
  }
  let updatedPanel = [
    [[panel[0][0] + panel[1][1] + panel[2][2]], [0, 1, 2], [0, 1, 2]], //diagonal
    [[panel[0][2] + panel[1][1] + panel[2][0]], [0, 1, 2], [2, 1, 0]], //diagonal
    [[panel[0][0] + panel[1][0] + panel[2][0]], [0, 1, 2], [0, 0, 0]], //vertical
    [[panel[0][1] + panel[1][1] + panel[2][1]], [0, 1, 2], [1, 1, 1]], //vertical
    [[panel[0][2] + panel[1][2] + panel[2][2]], [0, 1, 2], [2, 2, 2]], //vertical
    [[panel[0][0] + panel[0][1] + panel[0][2]], [0, 0, 0], [0, 1, 2]], //horizontal
    [[panel[1][0] + panel[1][1] + panel[1][2]], [1, 1, 1], [0, 1, 2]], //horizontal
    [[panel[2][0] + panel[2][1] + panel[2][2]], [2, 2, 2], [0, 1, 2]],
  ];
  checkPlays = [...updatedPanel];
}

function movePc(jugadas, icon) {
  let hasMoved = false;
  if (icon == "X") {
    priorityX(icon);
    if (!hasMoved) {
      priorityO(icon);
    }
  }

  if (icon == "O") {
    priorityO(icon);
    if (!hasMoved) {
      priorityX(icon);
    }
  }

  if (!hasMoved) {
    for (let i = 0; i < jugadas.length; i++) {
      let motion = jugadas[i][0].toString().split("");
      let x = 0;
      let O = 0;
      for (let k = 0; k < motion.length; k++) {
        if (motion[k] == "X") {
          x++;
        }
        if (motion[k] == "O") {
          O++;
        }
        if ((x == 1 || O == 1) && motion.includes("0")) {
          let index = motion.findIndex((num) => num == "0");
          let nextMoviment =
            jugadas[i][1][index].toString() + jugadas[i][2][index].toString();
          buttonPanel[buttonPc[nextMoviment]].style.color = "blue";
          setTimeout(function () {
            buttonPanel[buttonPc[nextMoviment]].innerText = icon;
          }, 1000);
          buttonPanel[buttonPc[nextMoviment]].style.fontSize = "3rem";
          panel[jugadas[i][1][index]][jugadas[i][2][index]] = icon;
          hasMoved = true;
          break;
        }
      }
      if (hasMoved) {
        break;
      }
    }
  }
  winner(icon);

  function priorityX(icon) {
    for (let i = 0; i < jugadas.length; i++) {
      let motion = jugadas[i][0].toString().split("");
      let x = 0;
      let O = 0;
      for (let k = 0; k < motion.length; k++) {
        if (motion[k] == "X") {
          x++;
        }
        if (motion[k] == "O") {
          O++;
        }
        if (x == 2 && motion.includes("0")) {
          let index = motion.findIndex((num) => num == "0");
          let nextMoviment =
            jugadas[i][1][index].toString() + jugadas[i][2][index].toString();
          buttonPanel[buttonPc[nextMoviment]].style.color = "blue";
          buttonPanel[buttonPc[nextMoviment]].style.fontSize = "3rem";
          setTimeout(function () {
            buttonPanel[buttonPc[nextMoviment]].innerText = icon;
          }, 1000);
          turn.push(turn[0]);
          panel[jugadas[i][1][index]][jugadas[i][2][index]] = icon;
          hasMoved = true;
          break;
        }
      }
      if (hasMoved) {
        break;
      }
    }
  }

function priorityO(icon) {
  for (let i = 0; i < jugadas.length; i++) {
    let motion = jugadas[i][0].toString().split("");
    let x = 0;
    let O = 0;
    for (let k = 0; k < motion.length; k++) {
      if (motion[k] == "X") {
        x++;
      }
      if (motion[k] == "O") {
        O++;
      }
      if (O == 2 && motion.includes("0")) {
        let index = motion.findIndex((num) => num == "0");
        let nextMoviment =
          jugadas[i][1][index].toString() + jugadas[i][2][index].toString();
        buttonPanel[buttonPc[nextMoviment]].style.color = "blue";
        buttonPanel[buttonPc[nextMoviment]].style.fontSize = "3rem";
        setTimeout(function () {
          buttonPanel[buttonPc[nextMoviment]].innerText = icon;
        }, 1000);
        turn.push(turn[0]);
        panel[jugadas[i][1][index]][jugadas[i][2][index]] = icon;
        hasMoved = true;
        break;
      }
    }
    if (hasMoved) {
      break;
    }
  }
}
}

function winner(player) {
  let winner=false
  if (panel[0][1] == player && panel[0][2] == player && panel[0][0] == player) {
    ShowWinner(player)
    winner=true  
  }
  if (panel[1][0] == player && panel[1][1] == player && panel[1][2] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[2][0] == player && panel[2][1] == player && panel[2][2] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[0][0] == player && panel[1][1] == player && panel[2][2] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[2][0] == player && panel[1][1] == player && panel[0][2] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[0][0] == player && panel[1][0] == player && panel[2][0] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[0][1] == player && panel[1][1] == player && panel[2][1] == player) {
    ShowWinner(player)
    winner=true
  }
  if (panel[0][2] == player && panel[1][2] == player && panel[2][2] == player) {
    ShowWinner(player)
    winner=true
  }
if(!winner){
 let numberOfPanelFilled=0;
 for (let i = 0; i < buttonPanel.length; i++) {
      if(buttonPanel[i].innerHTML.length!==0){
        numberOfPanelFilled++
      }     
  }
if(numberOfPanelFilled==buttonPanel.length){
  setTimeout(() => {
  playAgainButton[0].style.display="block"  
  result[0].style.display="flex"
  titleGame[0].style.display="none"
  screenGame[0].style.filter="opacity(0)"
  message[0].innerHTML="Empate"
  }, 2000);
  
}
}
}

function ShowWinner(player){
  setTimeout(() => {
  result[0].style.display="flex"
  titleGame[0].style.display="none"
  screenGame[0].style.filter="opacity(0)"
  message[0].innerHTML="Ha ganado" + " " + player
  playAgainButton[0].style.display="block" 
  },2000);
}
