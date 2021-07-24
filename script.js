var question = document.querySelector('#question');
    var ansContainer = document.querySelector('.container');
    var brief = document.querySelector('#brief');
    var note = document.querySelector('#note');
    var nav = document.querySelector('nav');
    var timer = document.querySelector('#timer');
    var player = document.querySelector('#player');
    var secondsLeft = 40;
    var setQuestions = [
        "What does API stand for?",'When','How','Who'
    ];
    var setAnswers = [
        ["Ans1.1", 'Ans1.2', 'Ans1.3', 'Ans1.4'],
        ["Ans2.1", 'Ans2.2', 'Ans2.3', 'Ans2.4'],
        ["Ans3.1", 'Ans3.2', 'Ans3.3', 'Ans3.4'],
        ["Ans4.1", 'Ans4.2', 'Ans4.3', 'Ans4.4']        
    ];
    var dataCorrect = [
        ['correct','notCorrect','notCorrect','notCorrect'],
        ['notCorrect','notCorrect','correct','notCorrect'],
        ['notCorrect','notCorrect','notCorrect','correct'],
        ['notCorrect','correct','notCorrect','notCorrect']
    ];
    

    const container = document.querySelectorAll('.container p');
    
    
    question.textContent='Welcome to Javascript Quiz';
    brief.textContent='Answer the following questions before the time is up. \nGood luck!';
    var startBtn = document.createElement('button');
    startBtn.textContent = 'Start Quiz';
    startBtn.classList.add('button');
    document.body.append(startBtn);
    
    startBtn.addEventListener('click',setTime);
    startBtn.addEventListener('click',startQuiz);    
    
    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function() {
            secondsLeft--;
            timer.textContent = secondsLeft + " seconds left";

            if(secondsLeft <= 0) {
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Prevent timer to go under 0
                secondsLeft = 0;
                timer.textContent = secondsLeft + " seconds left";
                // Calls function to create and append image
                // sendMessage();
            }

        }, 1000);
    }
    

    function startQuiz() {
            startBtn.setAttribute('style', 'display: none');
            brief.setAttribute('style', 'display: none');
            note.setAttribute('style', 'display: none');
            question.textContent = setQuestions[0];
            for (var i = 0 ; i < container.length ; i++) {          
                container[i].textContent = setAnswers[0][i];
                container[i].classList.add('button');
                container[i].setAttribute('style', 'border: .05rem solid blue; padding: 4px')
                container[i].setAttribute('data-state',dataCorrect[0][i])
            }
            
            ansContainer.addEventListener('click', 
            function (event) {                
                var element = event.target;                
                
                if (element.matches("p")) {     
                    var state = element.getAttribute("data-state"); 
                    if (state === "correct") {
                        console.log('Correct');   
                        note.setAttribute('style', 'display:block')                     
                        note.textContent = 'This is correct!';
                        
                        
                    } else {
                        console.log('Not correct');
                        secondsLeft = secondsLeft - 5;                        
                        note.setAttribute('style', 'display:block')                     
                        note.textContent = 'This is WRONG!';
                        

                    }
                }
            });
    }
        
    
        

    function setGame() {
        for (let i = 0 ; i < container.length ; i++) {
            container[i].textContent = '';
            container[i].setAttribute('style', 'display: none')
        }
    }

    setGame();

