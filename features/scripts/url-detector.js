// Validation functions (preserved from original)
function validateName(name) {
    // Only allow letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) && name.trim().length > 0;
}

function validateMobile(mobile) {
    // Only allow exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
}

function validatePin(pin) {
    // Only allow exactly 4 digits
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(pin);
}

function validateUrl(url) {
    // require host; accept both with and without scheme for flexibility
    try {
        if (!/^[a-zA-Z]+:\/\//.test(url)) {
            // try to add http to validate host
            url = 'http://' + url;
        }
        const u = new URL(url);
        return !!u.hostname;
    } catch (e) {
        return false;
    }
}

// Utility functions for showing/hiding validation messages
function showValidationMessage(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.style.display = "block";
}

function hideValidationMessage(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    element.style.display = "none";
}

// Global state management for form persistence
let appState = {
    currentStep: 'initial', // 'initial', 'signup', 'login', 'questions', 'final'
    progressPercentage: 0,
    formData: {
        signup: { name: '', mobile: '', pin: '' },
        login: { mobile: '', pin: '' },
        questions: { category: '', source: '' }
    }
};

// Store the current URL input for result display
let currentUrlInput = '';

// Improved progress bar management: text width measured and percentage label centered
function updateProgressBar(progressBarId, progressTextId, percentage) {
    const progressBar = document.getElementById(progressBarId);
    const progressText = document.getElementById(progressTextId);

    if (progressBar && progressText) {
        // Update progress width and text
        progressBar.style.width = percentage + "%";
        progressText.textContent = percentage + "%";

        const progressContainer = progressBar.parentElement;
        // Use inner width so padding/borders are excluded
        const containerWidth = progressContainer.clientWidth;

        // Measure text width reliably
        // getBoundingClientRect should work for visible elements (popups are shown before update)
        const textRect = progressText.getBoundingClientRect();
        const textWidth = textRect.width || progressText.offsetWidth || 24; // fallback

        // Compute pixel position for centering the text over the current progress
        const progressWidth = (percentage / 100) * containerWidth;
        let textPosition = progressWidth - (textWidth / 2);

        // Add small padding so text never touches container edges
        const padding = 8;
        const minPos = padding;
        const maxPos = Math.max(containerWidth - textWidth - padding, minPos);

        if (textPosition < minPos) textPosition = minPos;
        if (textPosition > maxPos) textPosition = maxPos;

        progressText.style.left = textPosition + "px";
    }
}

// Initial progress popup management
function showInitialProgressPopup() {
    document.getElementById("initialProgressPopup").style.display = "flex";
}

function hideInitialProgressPopup() {
    document.getElementById("initialProgressPopup").style.display = "none";
}

// Popup management functions with state persistence
function showSignupPopup() {
    document.getElementById("signupPopup").style.display = "flex";
    updateProgressBar("signupProgressBar", "signupProgressText", 50);
    appState.currentStep = 'signup';

    // Restore form data if exists
    if (appState.formData.signup.name) {
        document.getElementById("signupName").value = appState.formData.signup.name;
    }
    if (appState.formData.signup.mobile) {
        document.getElementById("signupMobile").value = appState.formData.signup.mobile;
    }
    if (appState.formData.signup.pin) {
        document.getElementById("signupPin").value = appState.formData.signup.pin;
    }
}

function hideSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
    // Save form data before hiding
    appState.formData.signup.name = document.getElementById("signupName").value;
    appState.formData.signup.mobile = document.getElementById("signupMobile").value;
    appState.formData.signup.pin = document.getElementById("signupPin").value;
}

function showLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
    updateProgressBar("loginProgressBar", "loginProgressText", 50);
    appState.currentStep = 'login';

    // Restore form data if exists
    if (appState.formData.login.mobile) {
        document.getElementById("loginMobile").value = appState.formData.login.mobile;
    }
    if (appState.formData.login.pin) {
        document.getElementById("loginPin").value = appState.formData.login.pin;
    }
}

function hideLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
    // Save form data before hiding
    appState.formData.login.mobile = document.getElementById("loginMobile").value;
    appState.formData.login.pin = document.getElementById("loginPin").value;
}

function showQuestionsPopup() {
    document.getElementById("questionsPopup").style.display = "flex";
    updateProgressBar("questionsProgressBar", "questionsProgressText", 65);
    appState.currentStep = 'questions';

    // Restore form data if exists
    if (appState.formData.questions.category) {
        document.getElementById("categorySelect").value = appState.formData.questions.category;
    }
    if (appState.formData.questions.source) {
        document.getElementById("sourceInput").value = appState.formData.questions.source;
    }
}

function hideQuestionsPopup() {
    document.getElementById("questionsPopup").style.display = "none";
    // Save form data before hiding
    appState.formData.questions.category = document.getElementById("categorySelect").value;
    appState.formData.questions.source = document.getElementById("sourceInput").value;
}

function showFinalProcessingPopup() {
    document.getElementById("finalProcessingPopup").style.display = "flex";
    updateProgressBar("finalProgressBar", "finalProgressText", 90);
    const loadingIcon = document.querySelector(".success-icon");
    if (loadingIcon) {
        loadingIcon.className = "loading-icon";
        loadingIcon.innerHTML = '<i class="fas fa-spinner"></i>';
    }
    document.getElementById("processingTitle").textContent = "Almost Done!";
    document.getElementById("finalMessage").textContent = "Analyzing your news...";
    document.getElementById("viewResults").style.display = "none";
    appState.currentStep = 'final';
}

function hideFinalProcessingPopup() {
    document.getElementById("finalProcessingPopup").style.display = "none";
}

// Result popup management
function showResultPopup() {
    document.getElementById("resultPopup").style.display = "flex";
}

function closeResultPopup() {
    document.getElementById("resultPopup").style.display = "none";
    // Reset state after completion
    appState.currentStep = 'initial';
}

function showNotNewsPopup() {
    document.getElementById("notNewsPopup").style.display = "flex";
}

function hideNotNewsPopup() {
    document.getElementById("notNewsPopup").style.display = "none";
    appState.currentStep = 'initial';
}

// Hide all popups
function hideAllPopups() {
    hideInitialProgressPopup();
    hideSignupPopup();
    hideLoginPopup();
    hideQuestionsPopup();
    hideFinalProcessingPopup();
    document.getElementById("resultPopup").style.display = "none";
}

// Resume from where user left off
function resumeFromState() {
    switch (appState.currentStep) {
        case 'signup':
            showSignupPopup();
            break;
        case 'login':
            showLoginPopup();
            break;
        case 'questions':
            showQuestionsPopup();
            break;
        case 'final':
            showFinalProcessingPopup();
            break;
        default:
            // Start fresh initial progress
            startInitialProgress();
            break;
    }
}

// Multi-stage progress animation: 0-25% in 1s, pause 0.5s, 25-50% in 1.5s
function startInitialProgress() {
    showInitialProgressPopup();
    appState.currentStep = 'initial';

    let currentProgress = 0;

    // Stage 1: 0% to 25% in 1 second (1000ms)
    const stage1Duration = 1000;
    const stage1Target = 25;
    const stage1Interval = 50; // Update every 50ms
    const stage1Increment = (stage1Target / stage1Duration) * stage1Interval;

    const stage1Timer = setInterval(() => {
        currentProgress += stage1Increment;

        if (currentProgress >= stage1Target) {
            currentProgress = stage1Target;
            clearInterval(stage1Timer);
            updateProgressBar("initialProgressBar", "initialProgressText", Math.round(currentProgress));

            // Stage 2: Pause for 0.5 seconds (500ms)
            setTimeout(() => {
                // Stage 3: 25% to 50% in 1.5 seconds (1500ms)
                const stage3Duration = 1500;
                const stage3Target = 50;
                const stage3Interval = 50;
                const stage3Increment = ((stage3Target - stage1Target) / stage3Duration) * stage3Interval;

                const stage3Timer = setInterval(() => {
                    currentProgress += stage3Increment;

                    if (currentProgress >= stage3Target) {
                        currentProgress = stage3Target;
                        clearInterval(stage3Timer);
                        updateProgressBar("initialProgressBar", "initialProgressText", Math.round(currentProgress));

                        // After reaching 50%, wait a moment then show signup popup
                        setTimeout(() => {
                            hideInitialProgressPopup();
                            showSignupPopup();
                        }, 500);
                    } else {
                        updateProgressBar("initialProgressBar", "initialProgressText", Math.round(currentProgress));
                    }
                }, stage3Interval);
            }, 500); // 0.5 second pause
        } else {
            updateProgressBar("initialProgressBar", "initialProgressText", Math.round(currentProgress));
        }
    }, stage1Interval);
}

// Track user flow type
let userFlowType = null; // 'signup' or 'login'

// Result display function
function displayResult(resultData) {
    // Update user input display
    document.getElementById('userInputDisplay').textContent = currentUrlInput;

    // Update verdict based on result
    const verdictTitle = document.getElementById('verdictTitle');
    let isFake;

    // Use sample data if no real data provided
    const data = resultData;

    // Determine verdict type and set appropriate styles
    let verdictType, iconClass, titleClass, summaryText;

    if (data.verdict.toLowerCase() === 'real') {
        isFake = false;
        verdictType = 'safe';
        iconClass = 'fas fa-check-circle';
        titleClass = 'safe';
        summaryText = 'This URL appears to be safe and has been verified through multiple security sources.';
    } else if (data.verdict.toLowerCase() === 'fake') {
        isFake = true;
        verdictType = 'malicious';
        iconClass = 'fas fa-times-circle';
        titleClass = 'fake';
        summaryText = 'This URL appears to be malicious and may contain harmful content.';
    } else {
        verdictType = 'uncertain';
        iconClass = 'fas fa-question-circle';
        titleClass = 'uncertain';
        summaryText = 'Limited information available. The URL requires additional verification.';
    }

    verdictTitle.className = `verdict-title ${titleClass}`;
    verdictTitle.textContent = data.verdict === 'Safe' ? '✅ Safe Link' :
        data.verdict === 'Malicious' ? '⚠️ Malicious Link' : '❓ Needs Verification';

    // Update score
    document.getElementById('scoreValue').textContent = data.score + '%';

    function setScore(targetPercent, isFake) {
        const circle = document.querySelector('.progress-ring-fill');
        const radius = 60;
        const circumference = 2 * Math.PI * radius;

        let current = 0; // start from 0
        const step = targetPercent > 60 ? 2 : 1; // faster for high scores

        circle.style.strokeDasharray = circumference;

        // apply gradient color (red for malicious / green for safe)
        circle.setAttribute("stroke", isFake ? "url(#gradientStrokeRed)" : "url(#gradientStroke)");

        const scoreValue = document.getElementById("scoreValue");

        function update() {
            const offset = circumference - (current / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            scoreValue.innerText = current + "%";

            if (current < targetPercent) {
                current += step;
                requestAnimationFrame(update);
            }
        }

        update();
    }

    // verdict box color update
    function setVerdict(verdict) {
        const verdictBox = document.getElementById("verdictBox");
        verdictBox.classList.remove("fake");
        if (verdict.toLowerCase() === "fake") {
            verdictBox.classList.add("fake");
            document.getElementById("verdictTitle").innerText = "⚠️ Malicious Link";
        } else {
            document.getElementById("verdictTitle").innerText = "✅ Safe Link";
        }
    }

    setVerdict(data.verdict);
    setScore(data.score, isFake);

    // Update sources
    const sourcesList = document.getElementById('sourcesList');
    sourcesList.innerHTML = `
            <div class="source-item">
                <div class="source-header">
                    <div class="source-name">Google Safe Browsing</div>
                </div>
                <div class="source-description">${data.googleSafe}</div>
            </div>
            <div class="source-item">
                <div class="source-header">
                    <div class="source-name">Virus Total</div>
                </div>
                <div class="source-description">${data.virusTotal}</div>
            </div>
            <div class="source-item">
                <div class="source-header">
                    <div class="source-name">URL Scan</div>
                </div>
                <div class="source-description">${data.urlScan}</div>
            </div>
    `;
    // Show result popup
    showResultPopup();
}

// Main detection flow
document.getElementById("detectUrlButton").addEventListener("click", async () => {
    const urlInput = document.getElementById("urlInput").value;
    const validationMessage = document.getElementById("validationMessage");
    let isTokenValid = false; // For demo purposes, always require signup/login

    // Store current URL input
    currentUrlInput = urlInput;
    console.log(validateUrl(urlInput));
    // Validate URL input
    if (urlInput.trim() === "") {
        validationMessage.textContent = "Please enter a Link to check.";
        validationMessage.style.display = "block";
        return;
    } else if (!validateUrl(urlInput)) {
        validationMessage.textContent = "Please enter a valid Link (include http/https).";
        validationMessage.style.display = "block";
        return;
    } else {
        validationMessage.style.display = "none";
    }

    isTokenValid = await checkToken();

    if (isTokenValid) {
        showFinalProcessingPopup();
        checkUrl(urlInput);
    } else {
        // Resume from where user left off or start fresh
        resumeFromState();
    }
});

document.getElementById("resultPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeResultPopup();
    }
});

// Switch between signup and login
document.getElementById("switchToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    hideSignupPopup();
    showLoginPopup();
});

document.getElementById("switchToSignup").addEventListener("click", (e) => {
    e.preventDefault();
    hideLoginPopup();
    showSignupPopup();
});

// Input restrictions for mobile and PIN fields
document.getElementById("signupName").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
});

document.getElementById("signupMobile").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
});

document.getElementById("loginMobile").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
});

document.getElementById("signupPin").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    }
});

document.getElementById("loginPin").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4);
    }
});

// Signup form validation and submission
document.getElementById("signupSubmit").addEventListener("click", async () => {
    const name = document.getElementById("signupName").value;
    const mobile = document.getElementById("signupMobile").value;
    const pin = document.getElementById("signupPin").value;

    let isValid = true;

    // Clear previous validation messages
    hideValidationMessage("signupNameError");
    hideValidationMessage("signupMobileError");
    hideValidationMessage("signupPinError");

    // Validate name
    if (name.trim() === "" || !validateName(name)) {
        showValidationMessage("signupNameError", "Please enter a valid name");
        isValid = false;
    }

    // Validate mobile
    if (mobile.trim() === "" || !validateMobile(mobile)) {
        showValidationMessage("signupMobileError", "Please enter a valid 10-digit mobile number");
        isValid = false;
    }

    // Validate PIN
    if (pin.trim() === "" || !validatePin(pin)) {
        showValidationMessage("signupPinError", "Please enter a 4-digit PIN");
        isValid = false;
    }

    if (isValid) {
        isValid = await createAccount(name, mobile, pin);
    }
    if (isValid == true) {
        userFlowType = 'signup';
        hideSignupPopup();
        // For signup, show questions popup
        showQuestionsPopup();
    }
    else if (isValid.message == "System Failure! Try again.") {
        showValidationMessage("signupPinError", "System Failure! Try again.");
    }
    else {
        showValidationMessage("signupPinError", "Already you have created Account! Login now.");
    }
});

// Login form validation and submission
document.getElementById("loginSubmit").addEventListener("click", async () => {
    const mobile = document.getElementById("loginMobile").value;
    const pin = document.getElementById("loginPin").value;

    let isValid = true;

    // Clear previous validation messages
    hideValidationMessage("loginMobileError");
    hideValidationMessage("loginPinError");

    // Validate mobile
    if (mobile.trim() === "" || !validateMobile(mobile)) {
        showValidationMessage("loginMobileError", "Please enter a valid 10-digit mobile number");
        isValid = false;
    }

    // Validate PIN
    if (pin.trim() === "" || !validatePin(pin)) {
        showValidationMessage("loginPinError", "Please enter a 4-digit PIN");
        isValid = false;
    }

    if (isValid) {
        isValid = await loginMyAccount(mobile, pin);
        if (isValid.success) {
            const urlInput = document.getElementById("urlInput").value;
            userFlowType = 'login';
            hideLoginPopup();
            // For login, go directly to final processing
            showFinalProcessingPopup();

            // Show loading animation and wait 3 seconds at 90%
            document.getElementById("processingTitle").textContent = "Almost Done!";
            document.getElementById("finalMessage").textContent = "Analyzing your news...";

            checkUrl(urlInput);
        }
        else {
            showValidationMessage("loginPinError", isValid.message);
        }
    }
});

// Questions form validation and submission (only for signup)
document.getElementById("questionsSubmit").addEventListener("click", async () => {
    const category = document.getElementById("categorySelect").value;
    const source = document.getElementById("sourceInput").value;

    let isValid = true;

    // Clear previous validation messages
    hideValidationMessage("categoryError");
    hideValidationMessage("sourceError");

    // Validate category selection
    if (category === "") {
        showValidationMessage("categoryError", "Please select a category");
        isValid = false;
    }

    // Validate source input
    if (source.trim() === "") {
        showValidationMessage("sourceError", "Please enter your preferred news source");
        isValid = false;
    }

    isValid = await sendQuestions(category, source);

    if (isValid.success) {
        hideQuestionsPopup();
        // Show final processing popup
        showFinalProcessingPopup();
        // Show loading animation and wait 3 seconds at 90%
        document.getElementById("processingTitle").textContent = "Almost Done!";
        document.getElementById("finalMessage").textContent = "Setting up your preferences and analyzing news...";
        checkUrl(currentUrlInput);
    }
});

// View Results button handler
document.getElementById("viewResults").addEventListener("click", async () => {
    hideFinalProcessingPopup();
    displayResult();
});

// Clipboard paste functionality
const urlInput = document.getElementById('urlInput');
const pasteButton = document.getElementById('pasteButton');

if (urlInput && pasteButton) {
    urlInput.addEventListener('focus', () => {
        pasteButton.style.display = 'inline-block';
    });

    urlInput.addEventListener('blur', () => {
        // small delay to allow clicking paste button
        setTimeout(() => {
            if (!pasteButton.matches(':hover')) {
                pasteButton.style.display = 'none';
            }
        }, 100);
    });

    pasteButton.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            urlInput.value = text.trim();
            const validationMessage = document.getElementById('validationMessage');
            if (validationMessage) validationMessage.style.display = 'none';
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            const validationMessage = document.getElementById('validationMessage');
            if (validationMessage) {
                validationMessage.textContent = 'Failed to paste. Please paste manually.';
                validationMessage.style.display = 'block';
            }
        }
    });
}


async function checkToken() {
    const token = localStorage.getItem('neethiToken') || null;
    if (token) {
        const request = await fetch('http://localhost:3000/check-token', {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        });
        const response = await request.json();
        if (response.valid) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

async function createAccount(name, mobile, pin) {
    const request = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, mobile, pin })
    });
    const response = await request.json();
    if (response.success) {
        localStorage.setItem('neethiToken', response.token);
        return true;
    }
    else if (response.message == 'System Failure!') {
        return { message: "System Failure! Try again." };
    }
    else {
        return false;
    }
}

async function loginMyAccount(mobile, pin) {
    const request = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ mobile, pin })
    });
    const response = await request.json();
    if (response.success) {
        localStorage.setItem('neethiToken', response.token);
    }
    return response;
}

async function sendQuestions(category, city) {
    const token = localStorage.getItem('neethiToken');
    const request = await fetch('http://localhost:3000/user-details', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ token, category, city })
    });
    const response = await request.json();
    return response;
}


async function checkUrl(url) {
    const urlId = Math.round((Math.random()) * 1000000);
    const token = localStorage.getItem('neethiToken');
    const request = await fetch('http://localhost:3000/check-url', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ urlId, token, url })
    });
    const response = await request.json();
    console.log(response);
    if (!response.code) {
        updateProgressBar("finalProgressBar", "finalProgressText", 100);

        // Change to success icon and update content
        const loadingIcon = document.querySelector(".loading-icon");
        loadingIcon.className = "success-icon";
        loadingIcon.innerHTML = '<i class="fas fa-check-circle"></i>';

        document.getElementById("processingTitle").textContent = "Analysis Complete!";
        document.getElementById("finalMessage").textContent = "Your Link analysis is ready.";
        document.getElementById("viewResults").style.display = "block";

        // Store the result data for display
        window.resultData = response;

        // Update the view results button to show the result popup
        document.getElementById("viewResults").onclick = function () {
            hideFinalProcessingPopup();
            displayResult(response);
        };
    }
    else if (response.code == 69) {
        hideFinalProcessingPopup();
        showNotNewsPopup();
    }
    else {
        confirm('n8n Workflow error');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}