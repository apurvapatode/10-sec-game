$(document).ready(function () {
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  var startGame = function () {
    if (!interval) {
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft <= 0) {
          updateHighScore();
          clearInterval(interval);
          interval = undefined;
          alert(`Time's up! Your score: ${score} Want to play again?`);
          restartGame();
        }
      }, 1000);
    }
  };

  var restartGame = function () {
    updateTimeLeft(10 + timeLeft);
    updateScore(-score);
    renderNewQuestion();
  };

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $("#user-input").on("keyup", function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var updateHighScore = function () {
    if (score >= highScore) {
      highScore = score;
      $("#hi-score").text(highScore);
    }
  };

  renderNewQuestion();
});
