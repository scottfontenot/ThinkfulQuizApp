//Step 1: Functions and Object definitions

var $ = require('jquery');
"use strict";

const questionsArray = [
 {
 	questionText: "What is the name of Pawnee's prosperous neighboring town?",
 	questionChoices: ['Eagleton', 'Haverford', 'Ludgate', 'Springfield'],
 	questionCorrectAnswer: '0',
 	correctDetails:'You are correct!',
 	incorrectDetails: 'Knope, you got the question wrong.'
 },

{
 	questionText: "What is the name of Pawnee's lowest elevation?",
 	questionChoices: ['Symth Hole', 'Badwater Basin', "Devil's Fissure", 'Wabash River Basin'],
 	questionCorrectAnswer: '2',
 	correctDetails:'You are correct!',
 	incorrectDetails: 'Knope, you got the question wrong.'
 },

{
 	questionText: "Name Pawnee's number one hottest club?",
 	questionChoices: ["Pharoah's Dilemma", 'DUI', 'Snakehole Lounge', 'The Bulge'],
 	questionCorrectAnswer: '2',
 	correctDetails:'You are correct!',
 	incorrectDetails: 'Knope, you got the question wrong.'
 },

{
 	questionText: "Name the breakout star of the Pawnee Harvest Festival?",
 	questionChoices: ['Mouse Rat', "Li'l Sebastian", 'One Paw Papa', 'Just the Tip (Andy Dwyer Solo Project)'],
 	questionCorrectAnswer: '1',
 	correctDetails:'You are correct!',
 	incorrectDetails: 'Knope, you got the question wrong.'
 },

{
 	questionText: "Name the largest employer in Pawnee?",
 	questionChoices: ["Don's Cement", 'Sweetums Confectionary Corp', "Kernston's Rubber Nipples", "The Glitter Factory"],
 	questionCorrectAnswer: '1',
 	correctDetails:'You are correct!',
 	incorrectDetails: 'Knope, you got the question wrong.'
 }
];

//VARIABLES

//initialize a variable to hold the count of questions
var totalQuestions = questionsArray.length;
//initialize a variable to hold the count of questions answered
var totalQuestionsAnswered = 0;
//initialize a variable to hold the count of questions answered correctly
var totalQuestionsCorrect = 0;
//initialize a variable to indicate the current questions
var currentQuestion = 0;

//if true, function will add some additional text based on user score
function passFail(totalCorrectAnswers) {
  if (totalCorrectAnswers == 5) {
    return true; 
  } else {
    return false;}
}

//will call this function on line 110
function displayQuestion(currentQuestion) {
  //display question 
  $('.quiz-question').text(questionsArray[currentQuestion].questionText);
  
  /*display question and choices.Use "For loop" to iterate through and display all the possible choices with radio button inputs */
  var quizChoices = '';
  for(var i = 0; i<questionsArray[currentQuestion].questionChoices.length; i++) {
        quizChoices += '<li>';
        quizChoices += "<input class='option' type='radio' value=\"" + i + "\" name='radio' required='required'>";
        quizChoices += questionsArray[currentQuestion].questionChoices[i];
        quizChoices += '</li>';
}
  $('.quiz-question-choices').html(quizChoices);
}

//wrapped Events in a container function
function startPage(){
  //when page loads, do the following
  $('#quiz-page').hide();
  $('#quiz-end').hide();
  $('#previous-question').hide();
  $('#next-question').hide();
  $('#show-results').hide();
  $('#answer-feedback').hide();
  $('#quiz-start').show();
}
//Step 2: Events...moved events to function startPage(line 88 above)
$('document').ready(function() {
  startPage();
  
  // Begin quiz button event 
  $('#quiz-start-button').on('click', function(e) {
    e.preventDefault();
    $('#quiz-start').hide();
    $('#quiz-end').hide();
    $('#quiz-page').show();
    /* unable to get this detail working correctly
    $('.quiz-question-number').text("Question: "+(currentQuestion + 1) + " of " + totalQuestions);
    */
    console.log(currentQuestion);
    $('#results').append('<p>Current Score: '+totalQuestionsCorrect+ ' right out of '+totalQuestionsAnswered+ " answered");
    
    //calls function in line 68 to display question
    displayQuestion(currentQuestion);
  });
  
  //final answer button trigger
  $('#quiz-final-button').click(function (e) {
    e.preventDefault();
    $('#quiz-final-button').hide();
    
    //show next question button
    $('#next-question').show();
    $('#previous-question').show();
    
//grab user input from radio dial
    var userInput = $('input[name="radio"]:checked').val();
    totalQuestionsAnswered++;
    
//Check answer
if(userInput == questionsArray[currentQuestion].questionCorrectAnswer) {
  totalQuestionsCorrect++;
  $('#answer-feedback').text(questionsArray[currentQuestion].correctDetails);
}
else {
  $('#answer-feedback').text(questionsArray[currentQuestion].incorrectDetails);
}
  $('#answer-feedback').show();
  
//display updated user progress on quiz
$('#results').text('Current progress: '+totalQuestionsCorrect+ ' correct out of '+totalQuestionsAnswered+ ' answered');


//handle final question, "+1" is b/c currentQuestion was set to 0
if(currentQuestion + 1 == questionsArray.length) {
  $('#next-question').hide();
  $('#previous-question').hide();
  $('#answer-feedback').hide();
  $('#quiz-final-button').hide();
  $('#show-results').show();
  
    }
});
  
  //next-question button trigger
  $('#next-question').click(function(e) {
    currentQuestion++;
    e.preventDefault();
    $('#previous-question').hide();
    $('#next-question').hide();
    $('#answer-feedback').hide();
    $('#quiz-final-button').show();
    displayQuestion(currentQuestion);
  });
  
  //previous button trigger
  $('#previous-question').click(function(e) {
    currentQuestion--;
    e.preventDefault();
    $('#next-question').hide();
    $('#answer-feedback').hide();
    $('#quiz-final-button').show();
    displayQuestion(currentQuestion);
  });

//show results button
$('#show-results').click(function(e) {
  e.preventDefault();
  $('#quiz-start').hide();
  $('#quiz-page').hide();
  if(passFail(totalQuestionsCorrect)) {
    //true "You're a local!"
    $('#quiz-end-final-score').text("You Passed, You're a local! Your final score is "+totalQuestionsCorrect+ ' out of ' +totalQuestionsAnswered+'.');
    $('#quiz-end-image').append('<img src="https://vignette4.wikia.nocookie.net/parksandrecreation/images/7/7b/PawneeJournalMemorial.jpg/revision/latest/scale-to-width-down/310?cb=20111122175217">');
    
  }
  else {
    $('#quiz-end-final-score').text("Wow, You're no local! Final score is "+totalQuestionsCorrect+ ' correct questions out of ' +totalQuestionsAnswered+'.');
     $('#quiz-end-image').hide();
  }
  $('#quiz-end').show();
 
});


//replay button
$('#play-again').click(function () {
  location.reload();
});
});

















