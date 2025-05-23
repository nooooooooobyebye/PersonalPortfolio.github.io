const emojis = ["🥞","🥞","🌯","🌯","🍮","🍮","🪷","🪷","💐","💐","🐝","🐝","🐧","🐧","🐇","🐇","🪻","🪻","🧌","🧌"];  //Array of emojis that will be used for game

let shuffleEmojis = shuffle(emojis); //Shuffles emojis so that they all show up in different boxes

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5); // Shuffle function gives ability to shuffle emojis
}

function createBoard() { //generates game board where emojis will be displayed and handles flipping and matching emojis
  const gameContainer = document.querySelector('.container .game'); //Finds spot on the page where the game will go
  gameContainer.innerHTML = ''; // Clear the current board

  for (let i = 0; i < shuffleEmojis.length; i++) {
    let box = document.createElement('div'); //creates a new div element that will represent a single card on the game boward
    box.classList.add('item'); //adds item to div (card)
    
    box.onclick = (e) => { 
      e.target.classList.add('boxOpen'); //picks area where the game will be, inside container box, and looks for the part game to put the cards in
      setTimeout(() => { //gives a certain amount of time for the flipped card to be shown before it flips upside down again or checks if there are any matching cards
        if (document.querySelectorAll('.boxOpen').length > 1) { //Checks if two cards are open, if so check if the match
          if (document.querySelectorAll('.boxOpen')[0].innerHTML == document.querySelectorAll('.boxOpen')[1].innerHTML) { //if emoji of two open cards match, then the following happens
            document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
            document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch'); //marks the matched cards to show they've been matched

            document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
            document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen'); //takes away "open" label from matched cards so they stay flipped and you can see emoji

            if (document.querySelectorAll('.boxMatch').length === emojis.length) {
              alert("You won!"); // Alert for when all pairs are matched ("You won!")
            }
          } else {
            document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
            document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen'); //if two cards don't match, boxOpen is removed so they both close again
          }
        }
      }, 500); //500 milliseconds
    };

    box.innerHTML = shuffleEmojis[i]; //puts an emoji on each card from the shuffled list
    gameContainer.appendChild(box); //puts new card with emoji on game screen
  }
}

// Reset the game
function resetGame() {
  shuffleEmojis = shuffle(emojis); // Reshuffle the emojis
  createBoard(); // Recreate the board with the reshuffled emojis
}

// Initialize the game when the page loads
createBoard();