document.addEventListener('DOMContentLoaded', () => {
    const textDisplay = document.getElementById('text-display');
    const inputField = document.getElementById('input-field');
    const timer = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const retryButton = document.getElementById('retry-btn');
    const resultsDiv = document.getElementById('results');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const timeTakenDisplay = document.getElementById('time-taken');

    let timeElapsed = 0;
    let timerInterval = null;
    let originalText = '';
    let startTime = null;

    // Fetch random text from the server
    async function fetchRandomText() {
        try {
            const response = await fetch('/api/text');
            originalText = await response.text();
            displayText(originalText);
        } catch (error) {
            console.error('Error fetching text:', error);
            originalText = 'Error loading text. Please try again.';
            displayText(originalText);
        }
    }

    // Display text with character-by-character formatting
    function displayText(text) {
        textDisplay.innerHTML = text.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');
    }

    // Start the typing test
    function startTest() {
        fetchRandomText();
        inputField.value = '';
        inputField.disabled = false;
        startButton.disabled = true;
        resultsDiv.classList.add('d-none');
        timeElapsed = 0;
        startTime = new Date();
        
        timerInterval = setInterval(() => {
            timeElapsed++;
            timer.textContent = `Time: ${timeElapsed}s`;
        }, 1000);

        inputField.focus();
    }

    // End the typing test
    function endTest() {
        clearInterval(timerInterval);
        inputField.disabled = true;
        startButton.disabled = false;
        calculateResults();
    }

    // Calculate and display results
    function calculateResults() {
        const timeTaken = timeElapsed;
        const typedText = inputField.value;
        const words = typedText.trim().split(/\s+/).length;
        const wpm = Math.round((words / timeTaken) * 60);
        
        let correctChars = 0;
        const minLength = Math.min(typedText.length, originalText.length);
        
        for (let i = 0; i < minLength; i++) {
            if (typedText[i] === originalText[i]) {
                correctChars++;
            }
        }
        
        const accuracy = Math.round((correctChars / originalText.length) * 100);

        // Display results
        resultsDiv.classList.remove('d-none');
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy;
        timeTakenDisplay.textContent = timeTaken;

        // Save results to server
        saveResults({
            wordsPerMinute: wpm,
            accuracy: accuracy,
            totalCharacters: originalText.length,
            correctCharacters: correctChars,
            wrongCharacters: originalText.length - correctChars,
            testDuration: `${timeTaken}s`,
            textContent: originalText
        });
    }

    // Save results to server
    async function saveResults(results) {
        try {
            const response = await fetch('/api/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(results)
            });
            const data = await response.json();
            console.log('Results saved:', data);
        } catch (error) {
            console.error('Error saving results:', error);
        }
    }

    // Update text display as user types
    inputField.addEventListener('input', () => {
        const typedText = inputField.value;
        const originalChars = originalText.split('');
        const typedChars = typedText.split('');

        textDisplay.innerHTML = originalChars.map((char, i) => {
            let className = 'char';
            if (i < typedChars.length) {
                className += typedChars[i] === char ? ' correct' : ' incorrect';
            }
            return `<span class="${className}">${char}</span>`;
        }).join('');

        // End test if user has typed the entire text
        if (typedText.length >= originalText.length) {
            endTest();
        }
    });

    // Event listeners
    startButton.addEventListener('click', startTest);
    retryButton.addEventListener('click', startTest);
});
