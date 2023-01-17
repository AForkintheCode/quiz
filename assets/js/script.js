//start & timer
var startbtn = document.querySelector(".start");
var timerEl = document.querySelector(".timer");
var timer;
var countdown;
//quiz
var regis = [];
var questionEl = document.getElementById("question");
var choiceAEl = document.getElementById("answer-a");
var choiceBEl = document.getElementById("answer-b");
var choiceCEl = document.getElementById("answer-c");
var choiceDEl = document.getElementById("answer-d");
var score = '';
document.getElementById("quiz").style.display = 'none'

//start button
startbtn.addEventListener("click",() => {
  startQuiz();
  startTimer();
  startbtndisabled:true;
  document.getElementById("quiz").style.display = 'block'
  document.getElementById("front").style.display = 'none'
});



//timer
function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount > 0) {     
        score = timerCount;
        }
 // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}


// list of all questions, choices, and answers
var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

let timerCount = 75;
let currentQuestion = 0;
//the quiz
function startQuiz() {
  clrData();  
  console.log(currentQuestion)
  regis = questions[currentQuestion].title;
  selection = questions[currentQuestion].choices;
  correct = questions[currentQuestion].answer;
  questionEl.textContent = regis;  
  choiceAEl.textContent = selection[0];
  choiceBEl.textContent = selection[1];
  choiceCEl.textContent = selection[2];
  choiceDEl.textContent = selection[3];
  let choicesEl = document.getElementsByClassName('answer')
  console.log("This is the question: " + regis)
  console.log("These are the choices: " + selection)
  console.log(choiceAEl)
  console.log(choiceBEl)
  console.log(choiceCEl)
  console.log(choiceDEl)

  for (let i=0; i < choicesEl.length ; i++){
    choicesEl[i].onclick = null
    choicesEl[i].addEventListener("click", function(event){
      event.preventDefault();
      console.log("This is the event target " + event.target.innerHTML)           
      if  (event.target.innerHTML === correct){
          console.log('correct answer!');
          currentQuestion++;                          
          startQuiz();                             
        }
      else if (event.target.innerHTML !== correct){ 
          console.log('wrong answer!');
          timerCount--;
          currentQuestion++;          
          startQuiz();                            
        }
      
      });
      ;
  }
  }
  
function clrData(){
    questionEl.textContent = '';    
    choiceAEl.textContent = '';
    choiceAEl.onclick=null;
    choiceBEl.textContent = '';
    choiceBEl.onclick=null;
    choiceCEl.textContent = '';
    choiceCEl.onclick=null;  
    choiceDEl.textContent = '';
    choiceDEl.onclick=null;
  }  

//hide score
document.getElementById("score").style.display = 'none';

//record score
var highScoreEl = $('#high-score');
var scoreListEl = $('#score-list');

function handleFormSubmit(event) {
  event.preventDefault();

  var playerScore = $('input[name="score-input"]').val();

  if (!playerScore) {
    console.log('Nothing entered!');
    return;
  }

  var playerScoreItemEl = $(
    '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
  );
  playerScoreItemEl.text(playerScore);

  // add delete button to remove player score item
  playerScoreItemEl.append(
    '<button class="btn btn-danger btn-small delete-item-btn">Remove</button>'
  );

  // print to the page
  scoreListEl.append(playerScoreItemEl + score);

  // clear the form input element
  $('input[name="score-input"]').val('');
}

function handleRemoveItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);

  // get the parent `<li>` element from the button we pressed and remove it
  btnClicked.parent('li').remove();
}

// use event delegation on the `shoppingListEl` to listen for click on any element with a class of `delete-item-btn`
scoreListEl.on('click', '.delete-item-btn', handleRemoveItem);
highScoreEl.on('submit', handleFormSubmit);






// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score