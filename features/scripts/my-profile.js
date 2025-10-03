document.addEventListener("DOMContentLoaded", function () {
    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");
    const saveChangesBtn = document.getElementById("saveChangesBtn");

    const userNameError = document.getElementById("userNameError");
    const userEmailError = document.getElementById("userEmailError");

    async function getUserData() {
        const token = localStorage.getItem('neethiToken');
        if (!token) {
            location.href = 'index.html';
        }
        const req = await fetch('http://localhost:3000/get-details', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const res = await req.json();
        userNameInput.value = res.name;
        userEmailInput.value = res.email || '';
    }

    getUserData();

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

    saveChangesBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission
        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (isNameValid && isEmailValid) {
            sendData(userNameInput.value, userEmailInput.value);
        } else {
            alert("Please correct the errors in the form.");
        }
    });

    // --- New Code for Modals and Success Message ---

    const logoutBtn = document.getElementById("logoutBtn");
    const deleteBtn = document.getElementById("deleteBtn");

    const modalOverlay = document.getElementById("modalOverlay");
    const logoutModal = document.getElementById("logoutModal");
    const deleteModal = document.getElementById("deleteModal");

    const confirmLogoutBtn = document.getElementById("confirmLogout");
    const cancelLogoutBtn = document.getElementById("cancelLogout");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");

    const successMessage = document.getElementById("successMessage");
    let successTimeout;

    function showModal(modal) {
        modalOverlay.classList.add("visible");
        modal.classList.remove("hidden");
        // Use a slight delay to trigger the CSS transition
        setTimeout(() => {
            modal.classList.add("visible");
        }, 10);
    }

    function hideModals() {
        modalOverlay.classList.remove("visible");
        logoutModal.classList.remove("visible");
        deleteModal.classList.remove("visible");
        // Hide with a slight delay to allow the transition to finish
        setTimeout(() => {
            logoutModal.classList.add("hidden");
            deleteModal.classList.add("hidden");
        }, 400);
    }

    function showSuccessMessage(message) {
        successMessage.querySelector("p").textContent = message;
        successMessage.classList.add("visible");
        successTimeout = setTimeout(() => {
            successMessage.classList.remove("visible");
        }, 3000);
    }

    // Event Listeners for Logout Modal
    logoutBtn.addEventListener("click", () => showModal(logoutModal));
    cancelLogoutBtn.addEventListener("click", hideModals);
    confirmLogoutBtn.addEventListener("click", () => {
        // Here you would handle the actual logout logic
        localStorage.removeItem('neethiToken');
        hideModals();
        // Redirect to a logout page or home page
        window.location.href = "index.html";
    });

    // Event Listeners for Delete Modal
    deleteBtn.addEventListener("click", () => showModal(deleteModal));
    cancelDeleteBtn.addEventListener("click", hideModals);
    confirmDeleteBtn.addEventListener("click", async () => {
        // Here you would handle the actual account deletion logic
        const token = localStorage.getItem('neethiToken');
        console.log(token)
        const req = await fetch('http://localhost:3000/delete-account', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const res = await req.json();
        console.log(res);
        hideModals();
        // Redirect to a confirmation page or home page
        if (res.success) {
            localStorage.removeItem('neethiToken');
            location.href = "index.html";
        }
        else {
            location.reload();
        }
    });

    // Close modals by clicking outside
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            hideModals();
        }
    });

    async function sendData(name, email) {
        const token = localStorage.getItem('neethiToken');
        const req = await fetch('http://localhost:3000/send-details', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, token })
        });
        const res = await req.json();
        console.log(res);
        if (res.success) {
            showSuccessMessage("Profile updated successfully!");
        }
    }
});