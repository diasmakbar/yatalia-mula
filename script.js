// Inisialisasi variabel
let questions = [];
let currentNumber = 1;
let currentLanguage = "eng"; // Default ke bahasa Inggris

// Fetch data dari JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;

    // Set nilai maksimal input berdasarkan jumlah pertanyaan
    const maxInput = document.getElementById('current-number');
    maxInput.max = questions.length;

    // Tampilkan pertanyaan awal setelah data selesai di-load
    displayQuestion(currentNumber, currentLanguage);
  })
  .catch(error => {
    console.error("Error loading questions:", error);
    document.getElementById('question-text').textContent = "Failed to load questions.";
  });

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
  const maxInput = document.getElementById('current-number').max;
  if (currentNumber < maxInput) {
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
    currentLanguage = event.target.value; // Nilai "eng" atau "idn"
    displayQuestion(currentNumber, currentLanguage);
  });
});

// Event listener untuk input manual
document.getElementById('current-number').addEventListener('input', (event) => {
  const input = parseInt(event.target.value);
  const maxInput = parseInt(event.target.max);
  if (!isNaN(input) && input >= 1 && input <= maxInput) {
    currentNumber = input;
    displayQuestion(currentNumber, currentLanguage);
  } else {
    alert(`Please enter a valid number between 1 and ${maxInput}`);
    updateCounter(currentNumber); // Reset ke nilai sebelumnya jika input tidak valid
  }
});

// Fungsi untuk memperbarui tampilan counter
function updateCounter(number) {
  document.getElementById('current-number').value = number;
}
