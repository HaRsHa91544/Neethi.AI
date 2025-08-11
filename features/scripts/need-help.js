// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove("active");
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
});

// Form validation and character count
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const messageTextarea = document.getElementById("message");
    const charCount = document.getElementById("charCount");
    const fileInput = document.getElementById("attachment");
    const fileInfo = document.getElementById("fileInfo");
    const fullName = document.getElementById("fullName");
    const mobile = document.getElementById("mobile");

    // Character count for message textarea
    messageTextarea.addEventListener("input", function () {
        const currentLength = this.value.length;
        charCount.textContent = currentLength;

        if (currentLength > 500) {
            charCount.style.color = "#e74c3c";
        } else {
            charCount.style.color = "#666";
        }
    });

    // File upload handling
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            fileInfo.style.display = "block";
            fileInfo.innerHTML = `
                <i class="fas fa-file"></i>
                <span>Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            `;
        } else {
            fileInfo.style.display = "none";
        }
    });

    // Input validation for Full Name (only characters)
    fullName.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    });

    // Input validation for Mobile Number (only 10 digits)
    mobile.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    // Form validation
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        // Validate full name
        const fullNameError = document.getElementById("fullNameError");
        if (!fullName.value.trim()) {
            fullNameError.textContent = "Full name is required";
            fullNameError.classList.add("show");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(fullName.value.trim())) {
            fullNameError.textContent = "Full name can only contain characters";
            fullNameError.classList.add("show");
            isValid = false;
        } else {
            fullNameError.classList.remove("show");
        }

        // Validate mobile number
        const mobileError = document.getElementById("mobileError");
        if (!mobile.value.trim()) {
            mobileError.textContent = "Mobile number is required";
            mobileError.classList.add("show");
            isValid = false;
        } else if (!/^\d{10}$/.test(mobile.value.trim())) {
            mobileError.textContent = "Please enter a valid 10-digit mobile number";
            mobileError.classList.add("show");
            isValid = false;
        } else {
            mobileError.classList.remove("show");
        }

        // Validate issue type
        const issueType = document.getElementById("issueType");
        const issueTypeError = document.getElementById("issueTypeError");
        if (!issueType.value) {
            issueTypeError.textContent = "Please select an issue type";
            issueTypeError.classList.add("show");
            isValid = false;
        } else {
            issueTypeError.classList.remove("show");
        }

        // Validate message
        const message = document.getElementById("message");
        const messageError = document.getElementById("messageError");
        if (!message.value.trim()) {
            messageError.textContent = "Message is required";
            messageError.classList.add("show");
            isValid = false;
        } else if (message.value.length > 500) {
            messageError.textContent = "Message must be 500 characters or less";
            messageError.classList.add("show");
            isValid = false;
        } else {
            messageError.classList.remove("show");
        }

        if (isValid) {
            // Form is valid, show success message
            alert("Thank you for your message! We will get back to you soon.");
            form.reset();
            charCount.textContent = "0";
            fileInfo.style.display = "none";
        }
    });
});


