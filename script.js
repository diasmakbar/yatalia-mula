// Inisialisasi variabel
let questions = [];
let currentNumber = 1;
let currentLanguage = "en";

// Fetch data dari JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion(currentNumber, currentLanguage); // Tampilkan pertanyaan awal
  })
  .catch(error => console.error("Error loading questions:", error));

// Fungsi untuk menampilkan pertanyaan
function displayQuestion(number, language) {
  const question = questions.find(q => q.id === number);
  if (question) {
    document.getElementById('question-text').textContent = question[language];
  } else {
    document.getElementById('question-text').textContent = "Question not found.";
  }
}

// Event listener untuk tombol plus
document.getElementById('plus-btn').addEventListener('click', () => {
  if (currentNumber < questions.length) {
    currentNumber++;
    updateCounter(currentNumber);
    displayQuestion(currentNumber, currentLanguage);
  }
});

// Event listener untuk tombol minus
document.getElementById('minus-btn').addEventListener('click', () => {
  if (currentNumber > 1) {
    currentNumber--;
    updateCounter(currentNumber);
    displayQuestion(currentNumber, currentLanguage);
  }
});

// Event listener untuk tombol random
document.getElementById('random-btn').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentNumber = questions[randomIndex].id;
  updateCounter(currentNumber);
  displayQuestion(currentNumber, currentLanguage);
});

// Event listener untuk toggle bahasa
document.querySelectorAll('input[name="language"]').forEach(radio => {
  radio.addEventListener('change', (event) => {
    currentLanguage = event.target.value;
    displayQuestion(currentNumber, currentLanguage);
  });
});

// Fungsi untuk memperbarui tampilan counter
function updateCounter(number) {
  document.getElementById('current-number').textContent = number;
}