// --- DOM Element References ---
const passwordBox = document.getElementById("password");
const len = document.getElementById("len");
const lenVal = document.getElementById("lenVal");
const genBtn = document.getElementById("genBtn");
const copyImg = document.getElementById("copyImg");
const copyMsg = document.getElementById("copyMsg");

// All possible characters for password generation
const chars =   
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyz" +
  "0123456789" +
  "!@#$%^&*()_+{}:|<>?[];',./-=";

// Generate a random password based on slider value
function createPassword() {
    const target = Number(len.value) || 12; // Default length = 12
    let password = "";

    for (let i = 0; i < target; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        password += chars[idx];
    }

    passwordBox.value = password; // Display password in input field
}

// Copy generated password to clipboard with UI feedback
async function copyPassword() {
    const text = passwordBox.value.trim();
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);

        // Temporary "Copied" message
        copyImg.style.display = "none";
        copyMsg.style.display = "block";
        setTimeout(() => {
            copyImg.style.display = "block";
            copyMsg.style.display = "none";
        }, 1000);
    }
    catch (e) {
        console.error("Copy Failed", e);
    }
}

// --- Event Listeners ---
genBtn.addEventListener("click", createPassword);
copyImg.addEventListener("click", copyPassword);
len.addEventListener("input", () => {
    lenVal.textContent = len.value; // Live update of slider value
});
