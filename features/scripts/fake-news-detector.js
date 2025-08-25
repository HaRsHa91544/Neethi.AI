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

// Store the current news input for result display
let currentNewsInput = '';

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
    document.getElementById('userInputDisplay').textContent = resultData.news;

    // Update verdict based on result
    // const verdictIcon = document.getElementById('verdictIcon');
    const verdictTitle = document.getElementById('verdictTitle');
    // const verdictSummary = document.getElementById('verdictSummary');
    let isFake;
    // Determine verdict type and set appropriate styles
    let verdictType, iconClass, titleClass, summaryText;

    if (resultData.verdict.toLowerCase() === 'real') {
        isFake = false;
        verdictType = 'real';
        iconClass = 'fas fa-check-circle';
        titleClass = 'real';
        summaryText = 'This information appears to be factual and has been verified through multiple trusted sources.';
    } else if (resultData.verdict.toLowerCase() === 'fake') {
        isFake = true;
        verdictType = 'fake';
        iconClass = 'fas fa-times-circle';
        titleClass = 'fake';
        summaryText = 'This claim appears to be false and contradicts established facts from reliable sources.';
    } else {
        verdictType = 'uncertain';
        iconClass = 'fas fa-question-circle';
        titleClass = 'uncertain';
        summaryText = 'Limited information available. The claim requires additional verification from multiple sources.';
    }

    // verdictIcon.className = `verdict-icon ${verdictType}`;
    // verdictIcon.innerHTML = `<i class="${iconClass}"></i>`;
    verdictTitle.className = `verdict-title ${titleClass}`;
    verdictTitle.textContent = resultData.verdict === 'Real' ? 'Real News' :
        resultData.verdict === 'Fake' ? 'Fake News' : 'Needs Verification';
    // verdictSummary.textContent = summaryText;

    // Update score
    document.getElementById('scoreValue').textContent = resultData.score + '%';

    // Update score description based on score
    const score = parseInt(resultData.score);
    let scoreDescription;
    // if (score >= 80) {
    //     scoreDescription = 'High confidence based on source reliability and cross-verification';
    // } else if (score >= 60) {
    //     scoreDescription = 'Moderate confidence - some verification found but requires caution';
    // } else if (score >= 40) {
    //     scoreDescription = 'Low confidence - limited supporting evidence available';
    // } else {
    //     scoreDescription = 'Very low credibility with no supporting evidence from reliable sources';
    // }
    // document.getElementById('scoreDescription').textContent = scoreDescription;


    function setScore(targetPercent, isFake) {
        const circle = document.querySelector('.progress-ring-fill');
        const radius = 60;
        const circumference = 2 * Math.PI * radius;

        let current = 0; // start from 0
        const step = targetPercent > 60 ? 2 : 1; // faster for high scores

        circle.style.strokeDasharray = circumference;

        // apply gradient color (red for fake / green for real)
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
            document.getElementById("verdictTitle").innerText = "⚠️ Fake News";
        } else {
            document.getElementById("verdictTitle").innerText = "✅ Real News";
        }
    }

    setVerdict(resultData.verdict);
    setScore(resultData.score, isFake);

    // Update sources
    const sourcesList = document.getElementById('sourcesList');
    if (!resultData.sources || resultData.sources.length === 0) {
        sourcesList.innerHTML = '<div class="no-sources">No verified sources found for this claim.</div>';
    } else {
        sourcesList.innerHTML = resultData.sources.map(source => `
            <div class="source-item">
                <div class="source-header">
                    <div class="source-name">${source.name}</div>
                    <a href="${source.link}" class="source-link" target="_blank">
                        View Source <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <div class="source-description">${source.desc}</div>
            </div>
        `).join('');
    }

    // Show result popup
    showResultPopup();
}

// Main detection flow
document.getElementById("detectButton").addEventListener("click", async () => {
    const newsInput = document.getElementById("newsInput").value;
    const validationMessage = document.getElementById("validationMessage");
    let isTokenValid;

    // Store current news input
    currentNewsInput = newsInput;

    // Validate news input (preserved validation)
    if (newsInput.trim() === "") {
        validationMessage.textContent = "Please, Enter the News you want to Check.";
        validationMessage.style.display = "block";
        return;
    } else {
        validationMessage.style.display = "none";
    }

    isTokenValid = await checkToken();

    if (isTokenValid) {
        showFinalProcessingPopup();
        checkNews(newsInput);
    }
    else {
        // Resume from where user left off or start fresh
        resumeFromState();
    }
});

// Overlay click handlers to hide popups
document.getElementById("initialProgressPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideInitialProgressPopup();
    }
});

document.getElementById("signupPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideSignupPopup();
    }
});

document.getElementById("loginPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideLoginPopup();
    }
});

document.getElementById("questionsPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideQuestionsPopup();
    }
});

document.getElementById("finalProcessingPopup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        hideFinalProcessingPopup();
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

// Input restrictions (preserved from original)
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
            const newsInput = document.getElementById("newsInput").value;
            userFlowType = 'login';
            hideLoginPopup();
            // For login, go directly to final processing
            showFinalProcessingPopup();

            // Show loading animation and wait 3 seconds at 90%
            document.getElementById("processingTitle").textContent = "Almost Done!";
            document.getElementById("finalMessage").textContent = "Analyzing your news...";

            checkNews(newsInput);
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

        const newsInput = document.getElementById("newsInput").value;
        checkNews(newsInput);
    }
});

// View Results button handler
document.getElementById("viewResults").addEventListener("click", async () => {
    hideFinalProcessingPopup();
    // Reset state after completion
});

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

async function checkNews(news) {
    const articleId = Math.round((Math.random()) * 1000000);
    const token = localStorage.getItem('neethiToken');
    const request = await fetch('http://localhost:3000/check-news', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ articleId, token, news })
    });
    const response = await request.json();
    if (!response.code) {
        updateProgressBar("finalProgressBar", "finalProgressText", 100);

        // Change to success icon and update content
        const loadingIcon = document.querySelector(".loading-icon");
        loadingIcon.className = "success-icon";
        loadingIcon.innerHTML = '<i class="fas fa-check-circle"></i>';

        document.getElementById("processingTitle").textContent = "Analysis Complete!";
        document.getElementById("finalMessage").textContent = "Your news analysis is ready.";
        document.getElementById("viewResults").style.display = "block";

        // Store the result data for display
        window.resultData = response;

        // Update the view results button to show the result popup
        document.getElementById("viewResults").onclick = function () {
            hideFinalProcessingPopup();
            displayResult(response);
        };
    }
    else {
        confirm('n8n Workflow error');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
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