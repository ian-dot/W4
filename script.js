var question = document.querySelector('#question');
var ansContainer = document.querySelector('#container');
var brief = document.querySelector('#brief');
var note = document.querySelector('#note');
var highScore = document.querySelector('#highScore');
var playerAndScore = {
    name:'',
    time:''
}
var nav = document.querySelector('nav');
var timer = document.querySelector('#timer');
var player = document.querySelector('#player');
var playerName = document.createElement('input');
var btnName = document.createElement('submit');
var label = document.createElement('label');
var timeHighScore
var nameHighScore

const container = document.querySelectorAll('#container p');
var startBtn = document.createElement('button');
var formDiv = document.createElement('div');
var counter = 0
var timerInterval
var secondsLeft
var setQuestions = [
    {
        actualQuestion: "What does API stand for?",
        actualSetAnswers : [
            {
                ans: "Application Programming Interface",
                correct : true                    
            },
            {
                ans: "Application Preparing Interface",
                correct : false                    
            },
            {
                ans: "Application Programming Information",
                correct : false                    
            },
            {
                ans: "Application Programming Industry",
                correct : false                    
            }
        ]
    },
    {
        actualQuestion: "APIs in client side",
        actualSetAnswers : [
            {
                ans: "Ans2.1",
                correct : false                    
            },
            {
                ans: "Ans2.2",
                correct : false                    
            },
            {
                ans: "Ans2.3",
                correct : true                    
            },
            {
                ans: "Ans2.4",
                correct : false                    
            }
        ]
    },
    {
        actualQuestion: "How is sth sth?",
        actualSetAnswers : [
            {
                ans: "Ans3.1",
                correct : false                    
            },
            {
                ans: "Ans3.2",
                correct : false                    
            },
            {
                ans: "Ans3.3",
                correct : false                    
            },
            {
                ans: "Ans3.4",
                correct : true                    
            }
        ]
    },
    {
        actualQuestion: "Who would sth sth?",
        actualSetAnswers : [
            {
                ans: "Ans4.1",
                correct : false                    
            },
            {
                ans: "Ans4.2",
                correct : true                    
            },
            {
                ans: "Ans4.3",
                correct : false                    
            },
            {
                ans: "Ans4.4",
                correct : false                    
            }
        ]
        }
    ]
    
    function renderHighScore(){
        if (playerAndScore !== null) {
            highScore.textContent = playerAndScore.name+' with '+playerAndScore.time+' seconds left.';
        }
        
    }
    function init(){
        // Clears the text of the high score
        highScore.textContent='';
        // Requires the data from local storage of high score
        playerAndScore = JSON.parse(localStorage.getItem("playerAndScore"));
        // If high score was retrieved from localStorage, updates the high score var value to it
        if (playerAndScore !== null) {
            highScore.textContent = playerAndScore.time;
        }
        // Function to render high score
        renderHighScore();
        
    };
    

    function storeHighScore(playerAndScore) {
        // Stringify and set key in localStorage
        localStorage.setItem("playerAndScore", JSON.stringify(playerAndScore));
    }

        
    function startGame(){
        // Clears the page to set the game from the beginning 
        setGame();
        // Welcomes the user with this text
        question.textContent='Welcome to Javascript Quiz';
        // Instructions for playing
        brief.textContent='Answer the following questions before the time is up. \nFor every wrong answer you get minus 5 seconds in the timer.\nGood luck!';
        startBtn.textContent = 'Start Quiz';
        startBtn.classList.add('button');
        document.body.append(startBtn);  
        startBtn.addEventListener('click',startQuiz);
        init();    
    }
    
    function gameOver() {
        // Display the text Game Over
        question.textContent = "Game Over";
        brief.setAttribute('style', 'display: block');
        brief.textContent= "Time's up. Try again.";
        startBtn.setAttribute('style', 'display: block');
        startBtn.textContent = 'Play Again!';
        
        
    }
    
    function setTime() { 
        
        // Sets interval in variable
        timerInterval = setInterval(function() {
            secondsLeft--;
            timer.textContent = secondsLeft + " seconds left";
            
            if(secondsLeft <= 0) { // ATENCION poner una validacion para cuando llegas a tiempo=0 y ejecutar un GAME OVER
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Prevent timer to go under 0
                secondsLeft = 0;
                timer.textContent = secondsLeft + " seconds left";
                counter=5
                // Clear the game
                setGame();
                // Executes the game over instruction
                gameOver();
               
            }
            
        }, 1000);
    }
    
    function startQuiz() { 
        init();
        // Set the time for the quiz
        secondsLeft = 50
        // Call setTime function
        setTime();
        // Set the counter to 1 so we can keep the count to know on which question we are
        counter = 1;
        // Hides the start button, the brief and the note
        startBtn.setAttribute('style', 'display: none');
        btnName.setAttribute('style', 'display: none');
        label.setAttribute('style', 'display: none');
        playerName.setAttribute('style', 'display: none');
        brief.setAttribute('style', 'display: none');
        note.setAttribute('style', 'display: none');
        note.textContent = "";
        // Clear question
        question.textContent='';
        
        renderQuestions(counter);
    }
    
    
    

    // Validate answer function
    function validateAnswer(event) {
        
        var element = event.target;
        // Check the data-state to know if the answer is correct or incorrect
        if (element) { 
            note.textContent = ""    
            var state = element.getAttribute("data-state"); 
            
            if (state==='true') {
               
                note.setAttribute('style', 'display:block')                     
                note.textContent = 'Awesome! correct!';
                counter = counter + 1
                renderQuestions(counter)

                
                
            } else {
                // Punishes the user extracting time from the timer
                secondsLeft = secondsLeft - 5;                        
                note.setAttribute('style', 'display:block')                     
                note.textContent = 'This is wrong :(';
                

            }
        }
    }

    function renderForm() {
        $(playerName).css('display','flex');
        $(btnName).css('display','flex','margin-left','5%')
        label.setAttribute('style', 'display: block');
        $(playerName).addClass("col-4");
        // btnName.setAttribute('style', 'display: block');
        label.setAttribute('for','name');
        label.setAttribute('style','margin-left:25%');
        // btnName.setAttribute('style','margin-left:5%');                
        label.textContent = 'Name';
        btnName.textContent = 'Save';
        btnName.classList.add('button');
        document.body.children[1].children[0].children[0].append(label)
        document.body.children[1].children[0].children[0].append(playerName)
        document.body.children[1].children[0].children[0].append(btnName)

    }
    
    function renderQuestions(counter) {
        // Validation to keep track of the number of the question user's at
        if(counter<setQuestions.length+1)
        {

            question.textContent = setQuestions[counter-1].actualQuestion;
            for (var i = 0; i<setQuestions[counter-1].actualSetAnswers.length; i++){
                container[i].textContent = setQuestions[counter-1].actualSetAnswers[i].ans; // Aqui
                
                container[i].classList.add('button');
                container[i].setAttribute('style', 'border: .05rem solid blue; padding: 4px')
                container[i].setAttribute('data-state',setQuestions[counter-1].actualSetAnswers[i].correct)
    
            }
    
            ansContainer.addEventListener('click',validateAnswer);
        }
        // If user reaches the last question
        if(counter>=setQuestions.length+1){
            
            setGame();
            question.textContent='You won!';
            clearInterval(timerInterval);
            // Validation when there's already a high score set
            if (playerAndScore !== null && secondsLeft>playerAndScore.time) {
                
                renderForm();
                btnName.addEventListener("click", function() {
                    console.log('event listener works')
                    playerAndScore.time = secondsLeft
                    playerAndScore.name = playerName.value.trim();
                    console.log(playerAndScore.name);
                    storeHighScore(playerAndScore);
                    // Let the user know that the high score was saved
                    brief.setAttribute('style', 'display: block');
                    brief.textContent='High Score saved'
                    startBtn.setAttribute('style', 'display: block');
                    startBtn.textContent = 'Play Again!';
                });
            };
            // Validation when there is no previous high score set
            if (playerAndScore==null){
                brief.setAttribute('style', 'display: flex');
                brief.textContent='You hit a new high score, write your name.'
                renderForm();
                btnName.addEventListener("click", function() {
                    console.log('event listener works')
                    let playerAndScore = {
                        name:'',
                        time:''
                    }
                    playerAndScore.time = secondsLeft
                    playerAndScore.name = playerName.value.trim();
                    
                    storeHighScore(playerAndScore);
                    // Hide the form
                    $(playerName).css('display','none');
                    $(btnName).css('display','none','margin-left','5%')
                    label.setAttribute('style', 'display: none');
                    // Let the user know that the high score was saved
                    brief.setAttribute('style', 'display: block');
                    brief.textContent='High Score saved'
                    startBtn.setAttribute('style', 'display: block');
                    startBtn.textContent = 'Play Again!';
                });
            }
            // Validation when the user did not beat the previous high score
            if (playerAndScore !== null && secondsLeft<playerAndScore.time) {
                console.log("You didn't beat the high score time though")
                brief.textContent="You didn't beat the high score time though"
                brief.setAttribute('style', 'display: block');
                startBtn.setAttribute('style', 'display: block');
                startBtn.textContent = 'Play Again!';
            }
            
        }
    }
                   

    function setGame() {
        for (let i = 0 ; i < container.length ; i++) {
            question.textContent='';
            note.textContent = "";
            container[i].textContent = '';
            container[i].setAttribute('style', 'display: none')
        }
    }

    
    
startGame();

    
    
    

