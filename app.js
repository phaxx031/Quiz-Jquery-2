const STORE = {
    questions: [
      {
        question: 'What is the best selling video game console of all time?',
        answers: [
          'Playstation 4',
          'Xbox',
          'Nintendo Wii',
          'Playstation 2'
        ],
        correctAnswer: 'Playstation 2'
      },
      {
        question: 'Who was ranked as the best video game character of all time on IGN in 2020?',
        answers: [
          'Mario',
          'Link',
          'Master Chief',
          'Cloud Strife'
        ],
        correctAnswer: 'Mario'
      },
      {
        question: 'What is the most profitable video game of all time to date?',
        answers: [
          'Honor of Kings',
          'Monster Strike',
          'Fortnite',
          'Pokemon Go'
        ],
        correctAnswer: 'Monster Strike'
      },
      {
        question: 'What is the average age of a gamer in the USA according to Wikipedia?',
        answers: [
          '9',
          '16',
          '35',
          '45'
        ],
        correctAnswer: '35'
      },
      {
        question: 'How much was first place grand prize money at the 2019 Fortnite World Cup?',
        answers: [
          '$1 million',
          '$3 million',
          '$5 million',
          '$10 million'
        ],
        correctAnswer: '$3 million'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
  

function buildQuiz(){
  // variable to store the HTML output
  const output = [];

    // for each question...
  STORE.questions.forEach(
    (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
    const answers = [];

        // and for each available answer...
    for(letter in currentQuestion.answers){

          // ...add an HTML radio button
        answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');


    // for each question...
    STORE.questions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        score++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${STORE.questions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);