"use strict";
// select
const signupFormItems = {
    container: document.querySelector(".signup-container"),
    all: document.querySelectorAll(".form-input"),
    signupBtn: document.querySelector("#signup-signup"),
    signupBtnContainer: document.querySelector(".signup-signup-container"),
    cancelBtn: document.querySelector("#signup-cancel"),
    name: document.querySelector("#signup-name"),
    lastName: document.querySelector("#signup-lastname"),
    age: document.querySelector("#signup-age"),
    phone: document.querySelector("#signup-phone"),
    email: document.querySelector("#signup-email"),
    country: document.querySelector("#signup-country"),
    city: document.querySelector("#signup-city"),
    username: document.querySelector("#signup-username"),
    password: document.querySelector("#signup-password"),
    repeatPassword: document.querySelector("#signup-repeatPassword"),
    acceptTerms: document.querySelector("#signup-acceptTerms"),
    termsAndRules: document.querySelector("#terms-and-rules-text"),
    signinBtn: document.querySelector("#signup-signin"),
}

// true values
let signupValue = {
    name: false,
    lastName: false,
    age: false,
    phone: false,
    email: false,
    country: true,
    city: true,
    username: false,
    password: false,
    repeatPassword: false,
    acceptTerms: false
}

// check value on input
function checkFormValues() {
    if (signupFormItems.acceptTerms.checked) {
        for (let i = 0; i < signupFormItems.all.length; i++) {
            if (signupFormItems.all[i].value) {
                signupFormItems.signupBtn.removeAttribute("disabled");
                signupFormItems.signupBtnContainer.classList.remove("not-allowed-mouse");
            } else {
                signupFormItems.signupBtn.setAttribute("disabled", "disabled");
                signupFormItems.signupBtnContainer.classList.add("not-allowed-mouse");
            }
        }
    } else {
        signupFormItems.signupBtn.setAttribute("disabled", "disabled");
        signupFormItems.signupBtnContainer.classList.add("not-allowed-mouse");
    }
}
checkFormValues();

// set event listener for all
for (let i = 0; i < signupFormItems.all.length; i++) {
    signupFormItems.all[i].addEventListener("input", () => {
        checkFormValues();
        signupFormItems.all[i].classList.remove("is-invalid")
    });
}

// signup name
function checkSignUpName() {
    let name = signupFormItems.name.value;
    if (name && name.length >= 3 && name.length <= 20) {
        signupValue.name = true;
    } else {
        signupFormItems.name.classList.add("is-invalid");
        signupFormItems.name.focus();
        signupValue.name = false;
    }
}

// signup lastname
function checkSignUplastName() {
    let lastname = signupFormItems.lastName.value;
    if (lastname && lastname.length >= 3 && lastname.length <= 20) {
        signupValue.lastName = true;
    } else {
        signupFormItems.lastName.classList.add("is-invalid");
        signupFormItems.lastName.focus();
        signupValue.lastName = false;
    }
}

// signup age
function checkSignUpAge() {
    let age = signupFormItems.age.value;
    if (age && age.length == 2) {
        signupValue.age = true;
    } else {
        signupFormItems.age.classList.add("is-invalid");
        signupFormItems.age.focus();
        signupValue.age = false;
    }
}

// signup phone
signupFormItems.phone.addEventListener("focus", () => {
    if (signupFormItems.phone.value == "") {
        signupFormItems.phone.value = "98"
    }
})
signupFormItems.phone.addEventListener("blur", () => {
    if (signupFormItems.phone.value == "98") {
        signupFormItems.phone.value = "";
    }
})

function checkSignUpPhone() {
    let phone = signupFormItems.phone.value;
    if (phone && phone.length == 12) {
        if (phone.slice(0, 2) == "98" || phone.slice(0, 2) == "۹۸") {
            signupValue.phone = true;
        } else {
            systemAlert.new({
                type: "danger",
                text: "The beginning of the phone number must be 98 And do not start with 0",
                duration: 3000
            })
            signupFormItems.phone.classList.add("is-invalid");
            signupFormItems.phone.focus();
            signupValue.phone = false;
        }
    } else {
        systemAlert.new({
            type: "danger",
            text: "The number must have 12 digits, without 0 and starting with 98",
            duration: 3000
        })
        signupFormItems.phone.classList.add("is-invalid");
        signupFormItems.phone.focus();
        signupValue.phone = false;
    }
}

// signup email
function checkSignUpEmail() {
    let email = signupFormItems.email.value;
    let emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g;
    if (email && email.length >= 5 && email.length <= 40 && emailFormat.test(email)) {
        signupValue.email = true;
    } else {
        signupFormItems.email.classList.add("is-invalid");
        signupFormItems.email.focus();
        signupValue.email = false;
    }
}

// signup country
function checkSignUpCountry() {
    let country = signupFormItems.country.value;
    if (country && country == "iran") {
        signupValue.country = true;
    } else {
        signupFormItems.country.classList.add("is-invalid");
        signupValue.country = false;
    }
}

// signup city
function checkSignUpCity() {
    let city = signupFormItems.city.value;
    if (city) {
        signupValue.city = true;
    } else {
        signupFormItems.city.classList.add("is-invalid");
        signupFormItems.city.focus();
        signupValue.city = false;
    }
}

// signup username
function checkSignUpUsername() {
    let username = signupFormItems.username.value;
    if (username && username.length >= 5 && username.length <= 16) {
        signupValue.username = true;
    } else {
        signupFormItems.username.classList.add("is-invalid");
        signupFormItems.username.focus();
        signupValue.username = false;
    }
}

// signup password
function checkSignUpPassword() {
    let password = signupFormItems.password.value;
    if (password && password.length >= 8 && password.length <= 16) {
        signupValue.password = true;
    } else {
        signupFormItems.password.classList.add("is-invalid");
        signupFormItems.password.focus();
        signupValue.password = false;
    }
}

// signup repeat password
function checkSignUpRepeatPassword() {
    let repeatPassword = signupFormItems.repeatPassword.value;
    if (repeatPassword && repeatPassword == signupFormItems.password.value) {
        signupValue.repeatPassword = true;
    } else {
        signupFormItems.repeatPassword.classList.add("is-invalid");
        signupFormItems.repeatPassword.focus();
        signupValue.repeatPassword = false;
    }
}

// signup accept terms
signupFormItems.acceptTerms.addEventListener("change", () => {
    checkFormValues();
    signupFormItems.acceptTerms.classList.remove("is-invalid")
})

function checkSignUpAcceptTerms() {
    if (signupFormItems.acceptTerms.checked) {
        signupValue.acceptTerms = true;
    } else {
        signupFormItems.acceptTerms.classList.add("is-invalid");
        signupValue.acceptTerms = false;
    }
}

// check all inputs
function signUpCheckAllInputs() {
    checkSignUpAcceptTerms();
    checkSignUpRepeatPassword();
    checkSignUpPassword();
    checkSignUpUsername();
    checkSignUpCity();
    checkSignUpCountry();
    checkSignUpEmail();
    checkSignUpPhone();
    checkSignUpAge();
    checkSignUplastName();
    checkSignUpName();
    signupFinallCheck();
}

var userPhone;
let currentConfirmOpen = false;

function signupFinallCheck() {
    if (signupValue.name && signupValue.lastName && signupValue.age && signupValue.phone && signupValue.email && signupValue.country && signupValue.city && signupValue.username && signupValue.password && signupValue.repeatPassword && signupValue.acceptTerms) {
        userPhone = signupFormItems.phone.value;
        if (currentConfirmOpen == false) {
            startSendConfirmCode();
            currentConfirmOpen = true;
        }
        tabs.signup.close();
        tabs.confirm.open();
        document.querySelector("#confirm-number").innerHTML = userPhone;
        for (let i = 0; i < signupFormItems.all.length; i++) {
            signupFormItems.all[i].classList.remove("is-invalid")
        }
    }
}

signupFormItems.signupBtn.addEventListener("click", () => {
    signUpCheckAllInputs()
})

// terms and rules
const signupTermsItems = {
    container: document.querySelector(".terms-container"),
    acceptBtn: document.querySelector("#terms-accept-btn"),
    closeBtn: document.querySelector("#terms-close-btn")
}
let termsTimeout = setTimeout(() => {}, 0);
const signupTermsTab = {
    open: () => {
        signupTermsItems.container.classList.remove("d-none");
        signupTermsItems.container.classList.remove("animate__bounceOut");
        signupTermsItems.container.classList.add("animate__fadeInDown");
        clearTimeout(termsTimeout);
        termsTimeout = setTimeout(() => {
            if (!signupFormItems.acceptTerms.checked) {
                signupTermsItems.acceptBtn.classList.add("animate__tada");
            }
        }, 600);
    },
    close: () => {
        signupTermsItems.container.classList.remove("animate__fadeInDown");
        signupTermsItems.acceptBtn.classList.remove("animate__tada");
        signupTermsItems.container.classList.add("animate__bounceOut");
        clearTimeout(termsTimeout);
        termsTimeout = setTimeout(() => {
            signupTermsItems.container.classList.add("d-none");
        }, 600);
    }
}

signupTermsItems.closeBtn.addEventListener("click", () => {
    signupTermsTab.close();
})

signupFormItems.termsAndRules.addEventListener("click", () => {
    signupTermsTab.open();
})

signupTermsItems.acceptBtn.addEventListener("click", () => {
    signupTermsTab.close();
    signupFormItems.acceptTerms.checked = true;
})

// signin
signupFormItems.signinBtn.addEventListener("click", () => {
    tabs.signup.close();
    setTimeout(() => {
        tabs.signin.open();
    }, 200);
})