document.addEventListener("DOMContentLoaded", function() {
    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");
    const saveChangesBtn = document.getElementById("saveChangesBtn");

    const userNameError = document.getElementById("userNameError");
    const userEmailError = document.getElementById("userEmailError");

    function showValidationMessage(element, message) {
        element.textContent = message;
        element.style.display = "block";
    }

    function hideValidationMessage(element) {
        element.textContent = "";
        element.style.display = "none";
    }

    function validateName() {
        const name = userNameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (name === "") {
            showValidationMessage(userNameError, "Name is required.");
            return false;
        } else if (!nameRegex.test(name)) {
            showValidationMessage(userNameError, "Name should only contain characters and spaces.");
            return false;
        } else {
            hideValidationMessage(userNameError);
            return true;
        }
    }

    function validateEmail() {
        const email = userEmailInput.value.trim();
        const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "") {
            showValidationMessage(userEmailError, "Email is required.");
            return false;
        } else if (!emailRegex.test(email)) {
            showValidationMessage(userEmailError, "Please enter a valid email address.");
            return false;
        } else {
            hideValidationMessage(userEmailError);
            return true;
        }
    }

    userNameInput.addEventListener("input", validateName);
    userEmailInput.addEventListener("input", validateEmail);

    saveChangesBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission
        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (isNameValid && isEmailValid) {
            alert("Profile updated successfully!");
            // Here you would typically send data to a server
        } else {
            alert("Please correct the errors in the form.");
        }
    });
});


