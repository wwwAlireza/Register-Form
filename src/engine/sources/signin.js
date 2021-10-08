function startSignin() {
    "use strict";
    const signinItems = {
        signin: document.querySelector(".signin"),
        container: document.querySelector(".signin-container"),
        logo: document.querySelector(".signin-logo"),
        signinLogo: document.querySelector("#signin-signin-logo"),
        disabledLayer: document.querySelector(".signin-disabled-layer"),
        username: document.querySelector("#signin-username"),
        password: document.querySelector("#signin-password"),
        passwordVisibility: document.querySelector("#signin-password-visibility"),
        usernameContainer: document.querySelector("#signin-username-container"),
        passwordContainer: document.querySelector("#signin-password-container"),
        usernameIcon: document.querySelector("#signin-username-icon"),
        passwordIcon: document.querySelector("#signin-password-icon"),
        passwordVisible: document.querySelector("#signin-password-visible"),
        passwordHidden: document.querySelector("#signin-password-hidden"),
        signinBtn: document.querySelector("#signin-button"),
        loading: document.querySelector(".signin-button-loading"),
        signupBtn: document.querySelector(".signin-signup"),
        forget: {
            mainBtn: document.querySelector(".signin-forget-password"),
            buttonsContainer: document.querySelector(".signin-resettab-buttons"),
            beforeDescription: document.querySelector(".signin-reset-description-before"),
            upTitle: document.querySelector(".signin-reset-title"),
            resetLogo: document.querySelector("#signin-reset-logo"),
            backBtn: document.querySelector("#signin-reset-back"),
            sendBtn: document.querySelector("#signin-reset-send"),
        }
    }

    // focus
    function signinSetFocus(elm, container, icon) {
        elm.addEventListener("focus", () => {
            container.classList.add("input-group-active");
            icon.style.transform = "scale(1.2)";
            icon.style.stroke = "var(--bs-primary)";
        })
        elm.addEventListener("blur", () => {
            container.classList.remove("input-group-active");
            icon.style.transform = "scale(1)";
            icon.style.stroke = "#000";
        })
    }

    signinSetFocus(signinItems.username, signinItems.usernameContainer, signinItems.usernameIcon);
    signinSetFocus(signinItems.password, signinItems.passwordContainer, signinItems.passwordIcon);

    // password visibility
    let signinPasswordStatus = "hidden";
    const signinPasswordVisibility = {
        visible: () => {
            signinPasswordStatus = "visible";
            signinItems.passwordHidden.classList.remove("d-none");
            signinItems.passwordVisible.classList.add("d-none");
            signinItems.password.setAttribute("type", "text");
        },
        hidden: () => {
            signinPasswordStatus = "hidden";
            signinItems.passwordHidden.classList.add("d-none");
            signinItems.passwordVisible.classList.remove("d-none");
            signinItems.password.setAttribute("type", "password");
        }
    }

    signinItems.passwordVisibility.addEventListener("click", () => {
        switch (signinPasswordStatus) {
            case "visible":
                {
                    signinPasswordVisibility.hidden();
                }
                break;
            case "hidden":
                {
                    signinPasswordVisibility.visible();
                }
                break;
        }
    })

    // inputs
    signinItems.username.addEventListener("input", () => {
        signinCheckValues();
    })
    signinItems.password.addEventListener("input", () => {
        signinCheckValues();
    })

    function signinCheckValues() {
        let username = signinItems.username.value;
        let password = signinItems.password.value;
        if (username.length <= 40 && username.length >= 5) {
            if (password.length <= 16 && password.length >= 8) {
                signinButtonStatus.on();
            } else {
                signinButtonStatus.off();
            }
        } else {
            signinButtonStatus.off();
        }
    }

    const signinButtonStatus = {
        on: () => {
            signinItems.signinBtn.removeAttribute("disabled");
        },
        off: () => {
            signinItems.signinBtn.setAttribute("disabled", "disabled");
        }
    }

    signinItems.username.addEventListener("keypress", (e) => {
        if (e.key == "Enter" || e.code == "Enter") {
            switch (signinResetTabStatus) {
                case "open":
                    {
                        startSigninnReset();
                    }
                    break;
                case "close":
                    {
                        signinStartSend();
                    }
                    break;
                default:
                    {
                        console.error("Variable error")
                    }
            }
        }
    })

    signinItems.password.addEventListener("keypress", (e) => {
        if (e.key == "Enter" || e.code == "Enter") {
            signinStartSend();
        }
    })

    // start signining
    var signinTry = localStorage.getItem("signinTry");
    if (signinTry) {
        signinTry = parseInt(signinTry);
        console.log("%cData is temporarily stored in localStorage (exercise). This information must be stored on the server", "color:red;font-size:1rem;background:#000;padding:10px");
    } else {
        signinTry = 0;
    }
    signinItems.signinBtn.addEventListener("click", () => {
        signinStartSend();
        systemAlert.close();
    })

    function signinStartSend() {
        if (signinTry <= 4) {
            signinTry++;
            localStorage.setItem("signinTry", signinTry);
            let username = signinItems.username.value;
            let password = signinItems.password.value;
            if (username.length <= 40 && username.length >= 5) {
                if (password.length <= 16 && password.length >= 8) {
                    signinLoading.on();
                    setTimeout(() => {
                        signinFakeError();
                    }, 2000);
                } else {
                    signinButtonStatus.off();
                    systemAlert.new({
                        type: "danger",
                        text: "Unauthorized operations",
                        duration: 4000
                    })
                }
            } else {
                signinButtonStatus.off();
                systemAlert.new({
                    type: "danger",
                    text: "Unauthorized operations",
                    duration: 4000
                })
            }
        } else {
            systemAlert.close();
            setTimeout(() => {
                systemAlert.new({
                    type: "danger",
                    text: "You tried too many times, please try again later",
                    duration: 4000,
                })
            }, 1)
        }
    }

    const signinLoading = {
        on: () => {
            signinItems.signinBtn.blur();
            signinItems.username.setAttribute("disabled", "disabled");
            signinItems.password.setAttribute("disabled", "disabled");
            signinItems.signinBtn.setAttribute("disabled", "disabled");
            signinItems.loading.classList.remove("d-none");
            signinItems.loading.classList.add("d-flex");
            signinItems.disabledLayer.classList.remove("d-none");
            signinItems.disabledLayer.classList.add("loading-mouse");
            signinItems.signinBtn.querySelector(".title").innerHTML = "Logging in";
            signinItems.signinBtn.style.width = "145px";
        },
        off: () => {
            signinItems.username.removeAttribute("disabled");
            signinItems.password.removeAttribute("disabled");
            signinItems.signinBtn.removeAttribute("disabled");
            signinItems.loading.classList.add("d-none");
            signinItems.loading.classList.remove("d-flex");
            signinItems.disabledLayer.classList.add("d-none");
            signinItems.disabledLayer.classList.remove("loading-mouse");
            signinItems.signinBtn.querySelector(".title").innerHTML = "Log In";
            signinItems.signinBtn.style.width = "110px";
        }
    }

    function signinFakeError() {
        if (signinTry == 3) {
            signinLoading.off();
            systemAlert.new({
                type: "info",
                text: "Oops! You seem to have forgotten your password, do not try to log in with all kinds of passwords, A better option is using the \"forget password\" button",
                duration: 10000
            })
            setTimeout(() => {
                signinItems.forget.mainBtn.classList.add("animate__headShake");
                setTimeout(() => {
                    signinItems.forget.mainBtn.classList.remove("animate__headShake")
                }, 700)
            }, 1500)

        } else {
            signinLoading.off();
            signinItems.usernameContainer.classList.add("animate__headShake");
            signinItems.passwordContainer.classList.add("animate__headShake");
            systemAlert.new({
                type: "danger",
                text: "invalid username or password",
                duration: 3000
            })
            setTimeout(() => {
                signinItems.usernameContainer.classList.remove("animate__headShake");
                signinItems.passwordContainer.classList.remove("animate__headShake");
            }, 1000);
            signinItems.usernameIcon.style.stroke = "var(--bs-danger)";
            signinItems.passwordIcon.style.stroke = "var(--bs-danger)";
        }
    }

    // signup
    signinItems.signupBtn.addEventListener("click", () => {
        tabs.signin.close();
        setTimeout(() => {
            tabs.signup.open();
        }, 700)
    })

    var signinResetTabStatus = "close";
    // reset password
    const signinResetPassword = {
        open: () => {
            signinResetTabStatus = "open";
            signinItems.passwordContainer.classList.remove("animate__bounceInLeft");
            signinItems.passwordContainer.classList.add("animate__bounceOutLeft");
            signinItems.signin.style.height = "180px";
            setTimeout(() => {
                signinItems.forget.mainBtn.classList.remove("animate__bounceInLeft");
                signinItems.forget.mainBtn.classList.add("animate__bounceOutLeft");
            }, 100);
            setTimeout(() => {
                signinItems.signinBtn.classList.remove("animate__bounceInLeft");
                signinItems.signinBtn.classList.add("animate__bounceOutLeft");
            }, 200)
            setTimeout(() => {
                signinItems.forget.beforeDescription.classList.remove("d-none");
                signinItems.forget.beforeDescription.classList.remove("animate__bounceOutRight");
                signinItems.forget.beforeDescription.classList.add("animate__bounceInRight");
                signinItems.signupBtn.classList.remove("animate__bounceInLeft");
                signinItems.signupBtn.classList.add("animate__bounceOutLeft");
            }, 300)
            setTimeout(() => {
                signinItems.forget.buttonsContainer.classList.remove("d-none");
                signinItems.forget.buttonsContainer.classList.remove("animate__bounceOutRight");
                signinItems.forget.buttonsContainer.classList.add("animate__bounceInRight");
            }, 400);
            signinItems.logo.classList.add("signin-reset-logo");
            signinItems.forget.upTitle.classList.remove("d-none");
            signinItems.forget.upTitle.classList.remove("animate__fadeOut");
            signinItems.forget.upTitle.classList.add("animate__fadeIn");
            signinItems.usernameContainer.style.bottom = "15px";
            signinItems.forget.resetLogo.classList.remove("d-none");
            signinItems.signinLogo.classList.add("d-none");
        },
        close: () => {
            signinResetTabStatus = "close";
            signinItems.logo.classList.remove("signin-reset-logo");
            signinItems.forget.resetLogo.classList.add("d-none");
            signinItems.signinLogo.classList.remove("d-none");
            signinItems.forget.upTitle.classList.remove("animate__fadeIn");
            signinItems.forget.upTitle.classList.add("animate__fadeOut");
            setTimeout(() => {
                signinItems.forget.upTitle.classList.add("d-none");
            }, 700);
            signinItems.usernameContainer.style.bottom = "0px";
            signinItems.passwordContainer.classList.remove("animate__bounceOutLeft");
            signinItems.passwordContainer.classList.add("animate__bounceInLeft");
            setTimeout(() => {
                signinItems.forget.beforeDescription.classList.remove("animate__bounceInRight");
                signinItems.forget.beforeDescription.classList.add("animate__bounceOutRight");
                setTimeout(() => {
                    signinItems.forget.beforeDescription.classList.add("d-none");
                }, 700)
            }, 100)

            setTimeout(() => {
                signinItems.forget.mainBtn.classList.remove("animate__bounceOutLeft");
                signinItems.forget.mainBtn.classList.add("animate__bounceInLeft");
            }, 150)

            setTimeout(() => {
                signinItems.forget.buttonsContainer.classList.remove("animate__bounceInRight");
                signinItems.forget.buttonsContainer.classList.add("animate__bounceOutRight");
                setTimeout(() => {
                    signinItems.forget.buttonsContainer.classList.add("d-none");
                }, 700)
            }, 200)
            signinItems.signin.style.height = "210px";
            setTimeout(() => {
                signinItems.signinBtn.classList.remove("animate__bounceOutLeft");
                signinItems.signinBtn.classList.add("animate__bounceInLeft");
            }, 250)
            setTimeout(() => {
                signinItems.signupBtn.classList.remove("animate__bounceOutLeft");
                signinItems.signupBtn.classList.add("animate__bounceInLeft");
            }, 350)
        }
    }

    signinItems.forget.mainBtn.addEventListener("click", () => { signinResetPassword.open() });
    signinItems.forget.backBtn.addEventListener("click", () => { signinResetPassword.close() });
    signinItems.forget.sendBtn.addEventListener("click", () => { startSigninnReset() });
    let animateRemover = setTimeout(() => {}, 0);
    let emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g;

    function startSigninnReset() {
        let username = signinItems.username.value;
        if (username.length <= 40 && username.length >= 5) {
            if (emailFormat.test(username)) {
                systemAlert.close();
                systemAlert.new({
                    type: "primary",
                    text: `The password recovery link has been sent to your Email address: "${username}". please check your inbox. also check the spam folder if you couldn't find it in your inbox.`,
                    duration: 15000
                });
                signinResetPassword.close();
            } else {
                systemAlert.close();
                systemAlert.new({
                    type: "primary",
                    text: `The password recovery link has been sent to your Email address: "******di7@gmail.com". please check your inbox. also check the spam folder if you couldn't find it in your inbox.`,
                    duration: 15000
                });
                signinResetPassword.close();
            }
        } else {
            clearTimeout(animateRemover);
            systemAlert.new({
                type: "danger",
                text: "invalid username or email",
                duration: 2000
            })
            signinItems.usernameContainer.classList.add("animate__headShake");
            animateRemover = setTimeout(() => {
                signinItems.usernameContainer.classList.remove("animate__headShake");
            }, 400)
        }
    }

}
startSignin()