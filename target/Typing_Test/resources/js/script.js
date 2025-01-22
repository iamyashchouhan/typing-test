document.addEventListener('DOMContentLoaded', function() {
    const sampleTextElement = document.getElementById('sample-text');
    const inputText = document.getElementById('input-text');
    const wpmElement = document.getElementById('wpm-value');
    const accuracyElement = document.getElementById('accuracy-value');
    const timeElement = document.getElementById('time-value');
    const restartButton = document.getElementById('restart-btn');
    const optionButtons = document.querySelectorAll('.option-button');

    let timer;
    let timeLeft;
    let isTyping = false;
    let currentIndex = 0;
    let correctCharacters = 0;
    let totalCharacters = 0;
    let testDuration = 15; // default duration in seconds
    let currentText = '';

    const words = [
        "plan", "part", "only", "find", "interest", "these", "have", "leave", "during", "consider",
        "group", "because", "around", "use", "old", "you", "way", "nation", "begin", "year",
        "play", "day", "come", "turn", "eye", "such", "call", "plan", "run", "real",
        "just", "get", "first", "world", "he", "each", "course"
    ];

    function getRandomWords(count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(words[Math.floor(Math.random() * words.length)]);
        }
        return result.join(' ');
    }

    function updateDisplay() {
        currentText = getRandomWords(50);
        sampleTextElement.innerHTML = currentText.split('').map((char, index) => 
            `<span class="character">${char}</span>`
        ).join('');
        currentIndex = 0;
        updateActiveCharacter();
    }

    function updateActiveCharacter() {
        const chars = sampleTextElement.querySelectorAll('.character');
        chars.forEach(char => char.classList.remove('active'));
        if (currentIndex < chars.length) {
            chars[currentIndex].classList.add('active');
        }
    }

    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timeLeft = testDuration;
        timeElement.textContent = timeLeft;
        
        timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }

    function calculateWPM() {
        const minutes = (testDuration - timeLeft) / 60;
        const words = correctCharacters / 5; // assuming average word length of 5 characters
        return Math.round(words / minutes);
    }

    function calculateAccuracy() {
        return totalCharacters === 0 ? 0 : Math.round((correctCharacters / totalCharacters) * 100);
    }

    function endTest() {
        clearInterval(timer);
        isTyping = false;
        inputText.disabled = true;
        
        const wpm = calculateWPM();
        const accuracy = calculateAccuracy();
        
        wpmElement.textContent = wpm;
        accuracyElement.textContent = accuracy + '%';

        // Remove active character highlight
        const chars = sampleTextElement.querySelectorAll('.character');
        chars.forEach(char => char.classList.remove('active'));
    }

    function resetTest() {
        clearInterval(timer);
        isTyping = false;
        currentIndex = 0;
        correctCharacters = 0;
        totalCharacters = 0;
        timeLeft = testDuration;
        
        updateDisplay();
        inputText.value = '';
        inputText.disabled = false;
        wpmElement.textContent = '0';
        accuracyElement.textContent = '0%';
        timeElement.textContent = testDuration;
        
        const chars = sampleTextElement.querySelectorAll('.character');
        chars.forEach(span => {
            span.classList.remove('correct', 'incorrect', 'active');
        });
        updateActiveCharacter();
    }

    function handleInput(e) {
        const inputValue = e.target.value;
        
        if (!isTyping && inputValue.length > 0) {
            isTyping = true;
            startTimer();
        }

        const currentChar = currentText[currentIndex];
        const chars = sampleTextElement.querySelectorAll('.character');
        
        if (inputValue.length > 0) {
            const typedChar = inputValue[inputValue.length - 1];
            
            if (currentChar === typedChar) {
                chars[currentIndex].classList.add('correct');
                correctCharacters++;
            } else {
                chars[currentIndex].classList.add('incorrect');
            }
            
            totalCharacters++;
            currentIndex++;
            updateActiveCharacter();
            
            // Update WPM and accuracy in real-time
            if (isTyping) {
                wpmElement.textContent = calculateWPM();
                accuracyElement.textContent = calculateAccuracy() + '%';
            }
        }

        // Keep the input field empty
        e.target.value = '';
    }

    // Handle test duration options
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(timer);
            optionButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            testDuration = parseInt(button.textContent);
            timeLeft = testDuration;
            timeElement.textContent = testDuration;
            resetTest();
            inputText.focus();
        });
    });

    // Event Listeners
    inputText.addEventListener('input', handleInput);
    restartButton.addEventListener('click', () => {
        resetTest();
        inputText.focus();
    });
    
    // Initialize
    resetTest();
    inputText.focus();
});
