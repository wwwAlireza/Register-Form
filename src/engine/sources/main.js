/**********
    coded by alireza mhm ;
    github : github.com/wwwAlireza ;
    codepen: codepen.io/alireza82 ;
    barnamenevisan: barnamenevisan.org/Profile/68586 ;
 **********/

"use strict";
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// tabs
var tabsTimer = setTimeout(() => {}, 0);
var body = document.querySelector(".body");
var pageTitle = document.querySelector("#page-title");
const signupTab = document.querySelector("#signup-tab");
const confirmTab = document.querySelector("#confirm-tab");
const signinTab = document.querySelector("#signin-tab");
let tabsAnimationType = "bounce";
const tabs = {
    signup: {
        open: () => {
            body.classList.remove("signin-background");
            body.classList.add("signup-background");
            localStorage.setItem("lastTab", "signup");
            pageTitle.innerHTML = "Sign Up";
            clearTimeout(tabsTimer);
            systemAlert.close();
            signupTab.classList.remove("d-none");
            signupTab.classList.remove(`animate__${tabsAnimationType}OutLeft`);
            signupTab.classList.add(`animate__${tabsAnimationType}InLeft`);
        },
        close: () => {
            clearTimeout(tabsTimer);
            signupTab.classList.remove(`animate__${tabsAnimationType}InLeft`);
            signupTab.classList.add(`animate__${tabsAnimationType}OutLeft`);
        }
    },
    confirm: {
        open: () => {
            pageTitle.innerText = "Confirm Number";
            systemAlert.close();
            clearTimeout(tabsTimer);
            confirmTab.classList.remove("d-none");
            confirmTab.classList.remove(`animate__${tabsAnimationType}OutRight`);
            confirmTab.classList.add(`animate__${tabsAnimationType}InRight`);
        },
        close: () => {
            clearTimeout(tabsTimer);
            confirmTab.classList.remove(`animate__${tabsAnimationType}InRight`);
            confirmTab.classList.add(`animate__${tabsAnimationType}OutRight`);
        }
    },
    signin: {
        open: () => {
            body.classList.remove("signup-background");
            body.classList.add("signin-background");
            localStorage.setItem("lastTab", "signin");
            pageTitle.innerHTML = "Log in";
            systemAlert.close();
            clearTimeout(tabsTimer);
            signinTab.classList.remove("d-none");
            signinTab.classList.remove(`animate__${tabsAnimationType}OutDown`);
            signinTab.classList.add(`animate__${tabsAnimationType}InDown`);
        },
        close: () => {
            clearTimeout(tabsTimer);
            signinTab.classList.remove(`animate__${tabsAnimationType}InDown`);
            signinTab.classList.add(`animate__${tabsAnimationType}OutDown`);
            setTimeout(() => {
                signinTab.classList.add("d-none");
            }, 1000);
        }
    }
}

// alerts
const alertItems = {
    container: document.querySelector("#alert-container"),
    alert: document.querySelector("#alert"),
    text: document.querySelector("#alert-text"),
    closeBtn: document.querySelector("#alert-close"),
};


var systemAlertTimer = setTimeout(() => {}, 0);
const systemAlert = {
    new: (options) => {
        if (options) {
            clearTimeout(systemAlertTimer);
            systemAlert.removeAllAlertTypes();
            alertItems.alert.classList.add(`alert-${options.type}`);
            alertItems.text.innerHTML = options.text;
            systemAlert.open();
            systemAlertTimer = setTimeout(() => {
                systemAlert.close();
            }, options.duration);
        }
    },
    open: () => {
        alertItems.container.classList.remove("d-none");
        alertItems.container.classList.remove("animate__bounceOutUp");
        alertItems.container.classList.add("animate__zoomInDown");
    },
    close: () => {
        clearTimeout(systemAlertTimer);
        alertItems.container.classList.remove("animate__zoomInDown");
        alertItems.container.classList.add("animate__bounceOutUp");
        body.classList.add("overflowY-hidden");
        document.body.classList.add("overflowY-hidden");
        systemAlertTimer = setTimeout(() => {
            alertItems.container.classList.add("d-none");
            body.classList.remove("overflowY-hidden");
            document.body.classList.remove("overflowY-hidden");
        }, 1000);
    },
    removeAllAlertTypes: () => {
        alertItems.alert.classList.remove("alert-danger");
        alertItems.alert.classList.remove("alert-warning");
        alertItems.alert.classList.remove("alert-success");
        alertItems.alert.classList.remove("alert-info");
        alertItems.alert.classList.remove("alert-dark");
    }
}

alertItems.closeBtn.addEventListener("click", () => {
    systemAlert.close();
})


// last tab
var lastTab = localStorage.getItem("lastTab");
if (lastTab) {
    switch (lastTab) {
        case "sginup":
            {
                pageTitle.innerHTML = "Sign Up";
                body.classList.remove("signin-background");
                body.classList.add("signup-background");
                signupTab.classList.remove("d-none");
                localStorage.setItem("lastTab", "signup");
            }
            break;
        case "signin":
            {
                pageTitle.innerHTML = "Sign In";
                body.classList.add("signin-background");
                body.classList.remove("signup-background");
                signinTab.classList.remove("d-none");
                localStorage.setItem("lastTab", "signin");
            }
            break;
        default:
            {
                pageTitle.innerHTML = "Sign Up";
                body.classList.remove("signin-background");
                body.classList.add("signup-background");
                signupTab.classList.remove("d-none");
                localStorage.setItem("lastTab", "signup");
            }
            break;
    }
} else {
    pageTitle.innerHTML = "Sign Up";
    body.classList.remove("signin-background");
    body.classList.add("signup-background");
    signupTab.classList.remove("d-none");
    localStorage.setItem("lastTab", "signup");
}