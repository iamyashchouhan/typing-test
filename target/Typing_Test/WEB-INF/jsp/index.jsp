<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typing Test</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo">monkeytype</div>
            <div class="test-options">
                <button class="option-button active">15</button>
                <button class="option-button">30</button>
                <button class="option-button">60</button>
                <button class="option-button">120</button>
            </div>
        </header>

        <main class="typing-test">
            <div class="typing-text" id="sample-text"></div>
            <div class="input-area">
                <textarea id="input-text" rows="3" spellcheck="false" placeholder="click here to start typing..."></textarea>
            </div>

            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value" id="wpm-value">0</div>
                    <div class="stat-label">wpm</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="accuracy-value">0%</div>
                    <div class="stat-label">accuracy</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="time-value">15</div>
                    <div class="stat-label">time</div>
                </div>
            </div>

            <div class="test-actions">
                <button class="restart-button" id="restart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 2v6h6"></path>
                        <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
                    </svg>
                </button>
            </div>
        </main>

        <footer class="footer">
            <p>Created by <a href="https://github.com/ymg7958" target="_blank">ymg7958</a> | Inspired by <a href="https://monkeytype.com" target="_blank">monkeytype.com</a></p>
        </footer>
    </div>

    <script src="${pageContext.request.contextPath}/resources/js/script.js"></script>
</body>
</html>
