// kodun son halini yazıyorum

const word = ["U", "N", "I", "T", "Y"]; // Oyunun kelimesi
let guessedCorrectly = Array(word.length).fill(false); // Harflerin doğru tahmin durumu
let score = 0; // Başlangıç puanı
let lives = 3; // Başlangıç can sayısı

// Ekranı güncelleyen fonksiyon
function updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = word
        .map((letter, index) =>
            guessedCorrectly[index]
                ? `<img src="IMAGES/${letter}.svg" alt="${letter}">`
                : `<img src="IMAGES/blank.svg" alt="blank">`
        )
        .join("");
    document.getElementById("score").textContent = score;
    document.getElementById("lives").innerHTML = "❤️".repeat(lives);
}

// Kullanıcının tahminini kontrol eden fonksiyon
function checkGuess(guess) {
    // Eğer tahmin bir kelime (birden fazla harf) ise
    if (guess.length > 1) {
        if (guess === word.join("")) {
            // Tahmin doğruysa kazandınız mesajı
            document.getElementById("win-message").style.display = "block";
        } else {
            // Tahmin yanlışsa tüm canları sıfırla ve kaybetti uyarısı ver
            lives = 0;
            alert("Wrong word! You lost the game.");
            resetGame();
        }
        return;
    }

    // Tek bir harf tahmini için kontrol
    let correct = false;
    word.forEach((char, index) => {
        if (char === guess && !guessedCorrectly[index]) {
            guessedCorrectly[index] = true;
            correct = true;
            score += 20;
        }
    });

    // Yanlış harf tahmini durumunda can eksilt
    if (!correct) {
        lives -= 1;
    }

    // Ekranı güncelle
    updateDisplay();

    // Oyunu kaybetme durumu
    if (lives === 0) {
        alert("Game over! Try again.");
        resetGame();
    } 
    // Oyunu kazanma durumu
    else if (guessedCorrectly.every((val) => val)) {
        document.getElementById("win-message").style.display = "block"; // Kazanma mesajını göster
    }
}

// Kazanma mesajını kapatan fonksiyon
function closeWinMessage() {
    document.getElementById("win-message").style.display = "none";
}

// Oyunu sıfırlayan fonksiyon
function resetGame() {
    guessedCorrectly = Array(word.length).fill(false);
    score = 0;
    lives = 3;
    updateDisplay();
}

// Tahmin edilen harfi veya kelimeyi almak için event listener
document.getElementById("submit-button").addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toUpperCase();
    if (guess) {
        checkGuess(guess);
        guessInput.value = "";
    }
});

// Reset butonuna tıklandığında oyunu sıfırla
document.getElementById("reset-button").addEventListener("click", resetGame);

// İlk ekranı güncelle
updateDisplay();
