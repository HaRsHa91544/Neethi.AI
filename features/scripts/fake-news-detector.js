// Validation functions
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

function showLoginError(message) {
    const errorElement = document.getElementById("loginError");
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function hideLoginError() {
    const errorElement = document.getElementById("loginError");
    errorElement.textContent = "";
    errorElement.style.display = "none";
}
// Fake News Detector Logic
document.getElementById("detectButton").addEventListener("click", () => {
    const newsInput = document.getElementById("newsInput").value;
    const detectionPopup = document.getElementById("detectionPopup");
    const loginPopup = document.getElementById("loginPopup");
    const progressBar = document.querySelector(".progress-bar");
    const validationMessage = document.getElementById("validationMessage");

    if (newsInput.trim() === "") {
        validationMessage.textContent = "Please, Enter the News you want to Check.";
        validationMessage.style.display = "block"; // Show the message
        return;
    } else {
        validationMessage.style.display = "none"; // Hide the message if input is valid
    }

    // Show the detection pop-up
    detectionPopup.style.display = "flex";
    progressBar.style.width = "0%"; // Reset progress bar

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
            progressBar.style.width = progress + "%";
        } else {
            clearInterval(interval);
        }
    }, 200);

    // Simulate API call and then show login pop-up
    setTimeout(async () => {
        clearInterval(interval); // Ensure interval is cleared
        progressBar.style.width = "90%"; // Set to 90% as requested
        detectionPopup.style.display = "none"; // Hide detection pop-up
        loginPopup.style.display = "flex"; // Show login pop-up
    }, 5000); // Simulate 2 seconds detection time
});

// Login Pop-up Logic with validation
document.getElementById("submitLogin").addEventListener("click", () => {
    const mobileNumber = document.getElementById("mobileNumber").value;
    const userName = document.getElementById("userName").value;
    let isValid = true;

    hideLoginError(); // Clear previous errors

    // Validate name
    if (userName.trim() === "" || !validateName(userName)) {
        isValid = false;
    }

    // Validate mobile number
    if (mobileNumber.trim() === "" || !validateMobile(mobileNumber)) {
        isValid = false;
    }

    // If validation fails, show a single error message
    if (!isValid) {
        showLoginError("Kindly provide Accurate and Valid Details");
        return;
    }

    // If validation passes, proceed
    alert(`Mobile Number: ${mobileNumber}\nName: ${userName}\nLogin successful! (Placeholder)`);
    document.getElementById("loginPopup").style.display = "none"; // Hide login pop-up
});

// Input validation for Name (only characters)
document.getElementById("userName").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
});

// Input validation for Mobile Number (only numbers, max 10 digits)
document.getElementById("mobileNumber").addEventListener("input", function (event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
});

async function detectNews(userNews) {
    
}