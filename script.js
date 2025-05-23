/*--------------------------------- Memory Game ---------------------------------*/
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

/*--------------------------------- To Do List ---------------------------------*/
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//function to add a new task
function addTask(){
  //checks if the input box is empty
  if(inputBox.value === ''){
    alert("You must write something!");  //alert
  }
  else{
    //creates a new list of tasks
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    //adds the new task to the container
    let span = document.createElement("span");
    //creates a delete button 
    span.innerHTML = "\u00d7"; // x symbol for delete button
    li.appendChild(span); //adds the button to the task
  }
  inputBox.value = ""; //clears the input after adding task
  saveData(); //saves the current task
}

listContainer.addEventListener("click", function(e){ //listens for clicks for tasks
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData(); //saves the task
  }
  else if(e.target.tagName === "SPAN"){ //if the delete button is clicked u remove the task
    e.target.parentElement.remove();  //removes the task item
    saveData();
  }
}, false);

//function to save the current task list to local storage
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}
//function to load & the display tasks from the storage
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
const clearBtn = document.getElementById("clear-btn");

//just displays the tasks when the web loads
showTask();

//adds an event listener for the clear all tasks button
clearBtn.addEventListener("click", function() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    listContainer.innerHTML = ''; //clears all the tasks from the list
    saveData(); //saves the empty list to local stirage
  }
});

/*--------------------------------- Kid's Game ---------------------------------*/
const alphabet = [
  {
    letter: "Aa",
    question: "What uppercase letter comes after 'A'?",
    answer: "B",
    hint: "The next letter is the first letter of a word that is a common object to play with outside.",
  },
  {
    letter: "Bb",
    question: "What uppercase letter comes after 'B'?",
    answer: "C",
    hint: "The next letter is the first letter of a word that is a common household pet, it might meow.",
  },
  {
    letter: "C",
    question: "What is the lowercase letter for 'C'?",
    answer: "c",
    hint: "The lowercase version of C looks identical to the uppercase version, only smaller.",
  },
  {
    letter: "D",
    question: "What is the lowercase version for letter D?",
    answer: "d",
    hint: "The lowercase version of 'D' is the inverse of lowercase letter 'b'.",
  },
  {
    letter: "Ee",
    question: "What is the uppercase letter that comes before 'E'?",
    answer: "D",
    hint: "The letter that comes before E is the first letter of an animal that swims in the pond.",
  },
  {
    letter: "Ff",
    question: "What number is the letter 'F' in the alphabetic order?",
    answer: "6",
    hint: "Subtract 9 from 15",
  },
  {
    letter: "Gg",
    question: "What word starts with 'G'?",
    answer: "Game",
    hint: "Hint...Hint..you’re playing a 'Game'!!!",
  },
  {
    letter: "Hh",
    question: "What uppercase letter comes after 'H'?",
    answer: "I",
    hint: "The letter is also a word you use to refer to yourself.",
  },
  {
    letter: "I",
    question: "What is the first letter of the word 'ice cream'?",
    answer: "i",
    hint: "It looks like a flower without the petals!",
  },
  {
    letter: "Jj",
    question: "A yummy treat often shaped like a bean. What is it?",
    answer: "Jellybean",
    hint: "It's sweet with rainbow colors! Jelly + bean",
  },
  {
    letter: "Kk",
    question: "What lowercase letter does a ruler of a kingdom start with?",
    answer: "k",
    hint: "It's the husband of a queen",
  },
  {
    letter: "Ll",
    question: "This yellow fruit is sour. What is it?",
    answer: "Lemon",
    hint: "It's an oval-shaped citrus fruit.",
  },
  {
    letter: "Mm",
    question: "This animal swings from tree to tree. What is it??",
    answer: "Monkey",
    hint: "It loves bananas!",
  },
  {
    letter: "Nn",
    question: "What's a part of your body that starts with 'N'?",
    answer: "Nose",
    hint: "You use it to smell!",
  },
  {
    letter: "Oo",
    question: "What uppercase letter looks like a big round hug?",
    answer: "O",
    hint: "It's like the shape of a donut!",
  },
  {
    letter: "Pp",
    question: "What uppercase letter looks like a straight line, but with a balloon on top?",
    answer: "P",
    hint: "It's the first letter of 'Pop'!",
  },
  {
    letter: "Q",
    question: "What does 'Q' look like when it's written in lowercase?",
    answer: "q",
    hint: "It's a letter that looks like 'p', but with a tail!",
  },
  {
    letter: "Rr",
    question: "What number is the letter 'R' in the alphabet?",
    answer: "18",
    hint: "It's an even number.",
  },
  {
    letter: "S",
    question: "What does 'S' look like when it's written in lowercase?",
    answer: "s",
    hint: "It's easier than you think... think of a mini version of 'S'!",
  },
  {
    letter: "Tt",
    question: "What capital letter comes before 'T'?",
    answer: "S",
    hint: "It might just come before 't' in the word 'Store'...",
  },
  {
    letter: "Uu",
    question: "What lowercase letter comes after 'U'?",
    answer: "v",
    hint: "It may just be the mini version of 'V'...",
  },
  {
    letter: "Vv",
    question: "What number is the letter 'V' in the alphabet?",
    answer: "22",
    hint: "What's 11 + 11?",
  },
  {
    letter: "Ww",
    question: "What word starts with the sound of 'W'?",
    answer: "What",
    hint: "It's the first word in the question!",
  },
  {
    letter: "Xx",
    question: "How many lines does the letter 'X' have?",
    answer: "2",
    hint: "What comes after '1' but before '3'?",
  },
  {
    letter: "Yy",
    question: "What did the yak say after eating a yam?",
    answer: "yammy",
    hint: "It's 'yummy' without the 'u' but with an 'a'...",
  },
  {
    letter: "Zz",
    question: "What number is the letter 'Z' in the alphabet?",
    answer: "26",
    hint: "If you know how many letters in the alphabet there are (2 and 6 put next to each other), then you know 'Z' is at the very end...",
  }
]; //array of letters with their corresponding question, answer, and hint (array that holds objects for each letter of the alphabet)

let currentQuestionIndex = -1; //initalize a variable to track the index of the current question

function getRandomQuestion() { //Function that randomly selects a question from alphabet array
    currentQuestionIndex = Math.floor(Math.random() * alphabet.length); //randomly selects index from 0 to alphabet length - 1
    return alphabet[currentQuestionIndex]; //returns randomized question's index
}

function startGame() { //function to start game
    const questionObj = getRandomQuestion(); 
  
    if (!questionObj) return; //If no question object is returned, exit the function early

    document.getElementById("letter").textContent = "Letter: " + questionObj.letter; //Set the text content of the 'letter' element to display the letter from the question object
    document.getElementById("question").textContent = questionObj.question; //Set the text content of the 'question' element to display the question from the question object
    document.getElementById("hint").textContent = questionObj.hint; // Set the text content of the 'hint' element to display the hint from the question object

    document.getElementById("hint").classList.add("hidden"); //Hides the hint at the initial start of the game

    document.getElementById("feedback").textContent = ""; //resets/clears the feedback text
    document.getElementById("answer").value = ""; //resets/clears the answer input (the "Enter your answer" box)
}

function checkAnswer() { //function to check the user's inputted answer
    const userAnswer = document.getElementById("answer").value;
    const correctAnswer = alphabet[currentQuestionIndex].answer; //Checks correct answer from current question object
    const feedback = document.getElementById("feedback");

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Good job! You got it right!"; //If user's input is correct and matches the correct answer, output this
    } else {
        feedback.textContent = "Oh no, it's okay! Maybe next time!!"; //Otherwise, output this
    }

    setTimeout(startGame, 4000);  //After checking the answer, wait 4 seconds before showing the next question
}

function showHint() {
    document.getElementById("hint").classList.remove("hidden"); //When user clicks the button, 'hidden' class is removed to show the hint
}

//Add event listeners to the buttons
document.getElementById("submit-button").addEventListener("click", checkAnswer);
document.getElementById("hint-button").addEventListener("click", showHint);


startGame(); //Start the game when the page loads

/*--------------------------------- Rhyming Game ---------------------------------*/
const words = [
  {
    main: "cat",
    correctAnswer: ["hat", "fat"],
    options: ["dog", "hat", "fish", "fat", "tree"]
  },
  {
    main: "sun",
    correctAnswer: ["fun"],
    options: ["car", "moon", "fun", "drum", "shoe"]
  },
  {
    main: "blue",
    correctAnswer: ["clue", "true"],
    options: ["red", "book", "clue", "true", "green"]
  },
  {
    main: "light",
    correctAnswer: ["night", "fight"],
    options: ["day", "dark", "moon", "fight", "night"]
  },
  {
    main: "car",
    correctAnswer: ["star", "far"],
    options: ["bus", "star", "train", "far", "book"]
  }
];

let currentIndex = 0;

const mainWordEl = document.getElementById("main-word");//where main word will be displayed
const optionsEl = document.getElementById("options");//this just shows the list of options 
const feedbackEl = document.getElementById("feedback");//just the feedback like correct or try again
const nextButton = document.getElementById("next-button"); //hopefully gets the button to go to the next word

function loadWord() {//function to help load the current word and options to the screen
  const current = words[currentIndex];// the main word and its options
  mainWordEl.textContent = current.main;//just displays the main word like "cat" 
  optionsEl.innerHTML = "";//just clears the old options 
  feedbackEl.textContent = ""; //clears thefeedback
  nextButton.classList.add("hidden");// this hides the next button until the user selects thr right answwr

  for (let i = 0; i < current.options.length; i++) { //goes through each option for the rhyming word
    const option = current.options[i]; //gets the current option text 
    const btn = document.createElement("button"); //makes the buttons
    btn.textContent = option;//the button text forthe options in the quiz

    btn.addEventListener("click", function() { //when this button is clicked it 
      checkAnswer(btn, option, current.correctAnswer); //checks if the clicked answer is right
    });

    optionsEl.appendChild(btn); //adds the button to the page
  }
}

function checkAnswer(button, selected, correctAnswers) { //function to hceck if the answer is correct
  const isCorrect = correctAnswers.includes(selected); //checks if the answer selected is correct in the list like for cat its hat and fat
  feedbackEl.textContent = isCorrect ? "youre correct!" : "try again!"; //shwos feedback whether it was right or wrong
  feedbackEl.style.color = isCorrect ? "white" : "brown"; //the color of the feedback for right or wrong

  const buttons = optionsEl.questionSelectorAll("button"); //the answer buttons 
  for (let i = 0; i < buttons.length; i++) { //goes through each button
    buttons[i].disabled = true; //once clicked an answer you cant click again
  }
}

nextButton.addEventListener("click", function() { //when the next button option is clicked u go to the next question
  currentIndex++;
  if (currentIndex < words.length) { //if there are more questions youre gonna load into the next one 
    loadWord();
  } else { //else if there are no more questions you are given feedback
    mainWordEl.textContent = "you're done! yay ";
    optionsEl.innerHTML = ""; //remove all the buttons
    feedbackEl.textContent = "good job!"; //shows the finished message
    nextButton.classList.add("");
  }
});

loadWord();// starts the quiz
