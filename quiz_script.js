// Define your questions
const questions = [
  {
    question: "Which cations hard water does not contain?",
    options: ["Mg", "Fe", "Na", "Al"],
    correctAnswer: "C"
  },
  {
    question: "Which ions permanent hardness does not contain?",
    options: ["Sulphates", "Bicarbonates", "Nitrates", "Chlorides"],
    correctAnswer: "B"
  },
  {
    question: "What is the unit of hardness?",
    options: ["mg/l", "l/mg", "mg/l²", "mg/ml"],
    correctAnswer: "A"
  },
  {
    question: "1 mol of CaSO₄, Mg(HCO₃)₂, MgCl₂ equals",
    options: ["1 mol of MgCO3", "2 mols of MgCO3", "2 mol of CaCO3", "1 mol of CaCO3"],
    correctAnswer: "D"
  },
  {
    question: "How many atoms of nitrogen and oxygen are  present in EDTA?",
    options: ["4 'N' & 4 'O' atoms", "2 'N' & 8 'O' atoms", "2 'N' & 4 'O' atoms", "4 'N' & 8 'O' atoms"],
    correctAnswer: "B"
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H₂O", "CO₂", "CH₄", "O₂"],
    correctAnswer: "A"
  }
];

// Initialize quiz variables
let currentQuestion = 0;
let userAnswers = [];


// Function to start the quiz
function startQuiz(event) {
  event.preventDefault(); // Prevent form submission
  const studentName = document.getElementById("studentName").value;
  const rollNumber = document.getElementById("rollNumber").value;
  if (studentName.trim() === "" || rollNumber.trim() === "") {
    document.getElementById("error-message").style.display = "block";
  } else {
    document.querySelector(".student-info-form").style.display = "none"; // Hide the student info form
    loadQuestion(0); // Load the first question
  }
}

// Add an event listener to the "Start Quiz" button
document.querySelector("#student-form button[type='submit']").addEventListener("click", startQuiz);

// Load and display a question
function loadQuestion(questionIndex) {
  const quizContainer = document.getElementById("quiz-container");
  const questionContainer = document.querySelector("#question-container");
  const optionsContainer = document.querySelector("#option-container");
  const nextButton = document.querySelector("#next-button");
  const showResultButton = document.querySelector("#show-result-button");
  const radioInputs = document.querySelectorAll("input[name='answer']");

  radioInputs.forEach((radioInput) => {
    radioInput.addEventListener("change", (event) => {
      userAnswers[questionIndex] = event.target.value;
    });
  });
  if (questionIndex >= 0 && questionIndex < questions.length) {
    const question = questions[questionIndex];
    questionContainer.textContent = `Question ${questionIndex + 1}: ${question.question}`;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${String.fromCharCode(65 + index)}"> ${String.fromCharCode(65 + index)}) ${option}`;
      optionsContainer.appendChild(label);
    });

    if (questionIndex === questions.length - 1) {
      // Last question, show "Show Result" button
      nextButton.style.display = "none";
      showResultButton.style.display = "block";
    } else {
      nextButton.style.display = "block";
      showResultButton.style.display = "none";
    }

    // Show the quiz container
    quizContainer.style.display = "block";
  }
}

// Add an event listener to the "Next" button to load the next question
// document.querySelector("#next-button").addEventListener("click", function () {
//   const selectedAnswer = document.querySelector("input[name='answer']:checked");
//   if (selectedAnswer) {
//     userAnswers.push(selectedAnswer.value);
//     loadQuestion(currentQuestion + 1);
//     currentQuestion++;
//   }
// });  

// // Function to display quiz results
// function showResult() {
//   const quizContainer = document.getElementById("quiz-container");
//   const resultContainer = document.getElementById("result-container");
//   const resultTable = document.getElementById("result-table-body");

//   // Hide the quiz container and show the result container
//   quizContainer.style.display = "none";
//   resultContainer.style.display = "block";

//   // Display individual question results
//   resultTable.innerHTML = "";
//   for (let i = 0; i < questions.length; i++) {
//     const newRow = resultTable.insertRow(resultTable.rows.length);
//     newRow.insertCell(0).textContent = `Question ${i + 1}`;
//     newRow.insertCell(1).textContent = questions[i].correctAnswer;
//     const userAnswer = userAnswers[i];

// // Check if the user answered the question
// if (userAnswer !== "" || userAnswer !== undefined) {
//   newRow.insertCell(2).textContent = userAnswer;
// } else {
//   newRow.insertCell(2).textContent = "Not answered"; // Display "Not answered" for unanswered questions
// }

//   }
// }



// correction 
// ...

// Add an event listener to the "Next" button to load the next question
document.querySelector("#next-button").addEventListener("click", function () {
  const selectedAnswer = document.querySelector("input[name='answer']:checked");
  if (selectedAnswer) {
    userAnswers[currentQuestion] = selectedAnswer.value; // Record the answer for the current question
    currentQuestion++;
    loadQuestion(currentQuestion); // Load the next question
  }
});

// Function to display quiz results
function showResult() {
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  const resultTable = document.getElementById("result-table-body");

  // Hide the quiz container and show the result container
  quizContainer.style.display = "none";
  resultContainer.style.display = "block"; // Note the corrected property name

  // Display individual question results
  resultTable.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const newRow = resultTable.insertRow(resultTable.rows.length);
    newRow.insertCell(0).textContent = `Question ${i + 1}`;
    newRow.insertCell(1).textContent = questions[i].correctAnswer;
    const userAnswer = userAnswers[i];

    if (userAnswer !== "" && userAnswer !== undefined) {
      newRow.insertCell(2).textContent = userAnswer;
    } else {
      newRow.insertCell(2).textContent = "Not answered"; // Display "Not answered" for unanswered questions
    }
  }
}






// Calculate the quiz score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      score++;
    }
  }
  return score;
}

// Add an event listener to the "Show Result" button
document.querySelector("#show-result-button").addEventListener("click", showResult);

// Reset the quiz and go back to the student info form
function goBackToQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");
  
  // Hide the result container and show the quiz container
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";
  resetQuiz();
}


// Add an event listener to the "Retake Quiz" button
document.querySelector("#retake-button").addEventListener("click", goBackToQuiz);

// Reset the quiz data
function resetQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  loadQuestion(0);
  document.getElementById("error-message").style.display = "none";
}




// Hide the quiz and result container initially
document.getElementById("quiz-container").style.display = "none";
document.getElementById("result-container").style.display = "none";