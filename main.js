import { signUp } from "./signup.js"
import { logIn } from "./login.js"

const radioButtons = document.querySelectorAll('[name="formType"]')

const signupFormEl = document.querySelector("#signup")
const loginFormEl = document.querySelector("#login")

function displayAppropriateForm (event) {
    if (event.target.checked) {
        if(event.target.value == "login") {
            signupFormEl.style.display = "none"
            loginFormEl.style.display = ""
            return
        }
        loginFormEl.style.display = "none"
        signupFormEl.style.display = ""
    }
}

for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", displayAppropriateForm)
}

if (signupFormEl) {
    signupFormEl.addEventListener("submit", signUp)    
}

if (loginFormEl) {
    loginFormEl.addEventListener("submit", logIn)
}