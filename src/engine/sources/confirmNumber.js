function startSendConfirmCode() {
    const confirmItems = {
        disabledLayer: document.querySelector("#confirm-disabled-layer"),
        container: document.querySelector(".confirm"),
        confirmMain: document.querySelector(".confirm-main"),
        input_1: document.querySelectorAll(".confirm-input")[0],
        input_2: document.querySelectorAll(".confirm-input")[1],
        input_3: document.querySelectorAll(".confirm-input")[2],
        input_4: document.querySelectorAll(".confirm-input")[3],
        inputs: document.querySelectorAll(".confirm-input"),
        number: document.querySelector("#confirm-number"),
        time: {
            minute: document.querySelector("#confirm-minute"),
            second: document.querySelector("#confirm-second"),
            resend: document.querySelector("#confirm-resend")
        },
        button: {
            confirm: document.querySelector("#confirm-confirm-btn"),
            back: document.querySelector("#confirm-back-btn"),
            loading: document.querySelector("#confirm-btn-loading"),
            container: document.querySelector(".confirm-footer-buttons")
        },
        edit: {
            editMain: document.querySelector(".confirm-edit-number"),
            input: document.querySelector("#confirm-edit-input"),
            cancelBtn: document.querySelector("#confirm-edit-cancel"),
            saveBtn: document.querySelector("#confirm-edit-save"),
            editBtn: document.querySelector("#confirm-edit-button"),
        }
    }

    confirmItems.input_1.focus();

    confirmItems.button.back.addEventListener("click", () => {
        tabs.confirm.close();
        tabs.signup.open();
        signupFormItems.phone.setAttribute("disabled", "disabled");
    })

    // inputs
    const numberFormat = /[0-9]/g;
    confirmItems.input_1.onkeyup = (e) => {
        confirmItems.input_1.classList.remove("confirm-wrong-code");
        if (e.key != "Backspace" || e.code != "Backspace") {
            confirmItems.input_2.focus();
        }
    }
    confirmItems.input_2.onkeyup = (e) => {
        confirmItems.input_2.classList.remove("confirm-wrong-code");
        if (e.key == "Backspace" || e.code == "Backspace") {
            if (confirmItems.input_2.value == "") {
                confirmItems.input_1.value = "";
                confirmItems.input_1.focus();
            }
        } else {
            confirmItems.input_3.focus();
        }
    }

    confirmItems.input_3.onkeyup = (e) => {
        confirmItems.input_3.classList.remove("confirm-wrong-code");
        if (e.key == "Backspace" || e.code == "Backspace") {
            if (confirmItems.input_3.value == "") {
                confirmItems.input_2.value = "";
                confirmItems.input_2.focus();
            }
        } else {
            confirmItems.input_4.focus();
        }
    }

    confirmItems.input_4.onkeyup = (e) => {
        confirmItems.input_4.classList.remove("confirm-wrong-code");
        if (e.key == "Enter" || e.code == "Enter") {
            confirmSendCode();
        } else if (e.key == "Backspace" || e.code == "Backspace") {
            if (confirmItems.input_4.value == "") {
                confirmItems.input_3.value = "";
                confirmItems.input_3.focus();
            }
        }
    }

    function confirmInputBlur() {
        confirmItems.inputs;
        for (let i = 0; i < confirmItems.inputs.length; i++) {
            confirmItems.inputs[i].addEventListener("blur", () => {
                if (confirmItems.inputs[i].value != "") {
                    confirmItems.inputs[i].classList.add("active-input")
                } else {
                    confirmItems.inputs[i].classList.remove("active-input")
                }
            })
        }
    }

    confirmInputBlur();

    // timing
    var confirmTimerInterval = setInterval(() => {}, 0);
    const confirmTimer = {
        start: (minute = "2", second = "00") => {
            confirmItems.time.resend.classList.add("d-none");
            confirmItems.time.resend.classList.remove("animate__jello");
            confirmItems.time.second.innerHTML = second;
            confirmItems.time.minute.innerHTML = minute;
            minute = parseInt(minute);
            second = parseInt(second);
            clearInterval(confirmTimerInterval);
            confirmTimerInterval = setInterval(() => {
                if (second != 0) {
                    second--;
                    if (String(second).length == 1) {
                        confirmItems.time.second.innerHTML = `0${second}`;
                    } else {
                        confirmItems.time.second.innerHTML = second;
                    }
                } else if (minute != 0) {
                    minute--;
                    confirmItems.time.minute.innerHTML = minute;
                    second = 60;
                    confirmItems.time.second.innerHTML = 59;
                } else {
                    clearInterval(confirmTimerInterval);
                    confirmTimerEnd();
                }
            }, 1000);
        },
        stop: () => {
            clearInterval(confirmTimerInterval);
        },
        continueTimer: () => {
            confirmTimer.start(confirmItems.time.minute.innerText, confirmItems.time.second.innerText);
        }
    }

    function confirmTimerEnd() {
        confirmItems.time.resend.classList.remove("d-none");
        confirmItems.time.resend.classList.add("animate__jello");
    }

    // resend
    confirmTimer.start("2", "00");
    confirmItems.time.resend.addEventListener("click", confirmCodeResend);

    function confirmCodeResend() {
        confirmTimer.start("2", "00");
        for (let i = 0; i < confirmItems.inputs.length; i++) {
            confirmItems.inputs[i].value = "";
            confirmItems.inputs[i].classList.remove("active-input");
            confirmItems.inputs[i].classList.remove("confirm-wrong-code");
        }

    }

    // confirm send;
    /***** Data is temporarily stored in localStorage (exercise). This information must be stored on the server *****/
    var confirmEditTry, confirmSendTry;
    confirmSendTry = localStorage.getItem("confirmSendTry");
    confirmEditTry = localStorage.getItem("confirmEditTry");
    if (!confirmSendTry) {
        confirmSendTry = 0;
        localStorage.setItem("confirmSendTry", 0);
    } else {
        confirmSendTry = parseInt(confirmSendTry);
        console.log("%cData is temporarily stored in localStorage (exercise). This information must be stored on the server", "color:red;font-size:1rem;background:#000;padding:10px");
    }
    if (!confirmEditTry) {
        confirmEditTry = 0;
        localStorage.setItem("confirmEditTry", 0);
    } else {
        confirmEditTry = parseInt(confirmEditTry);
        console.log("%cData is temporarily stored in localStorage (exercise). This information must be stored on the server", "color:red;font-size:1rem;background:#000;padding:10px");
    }

    const confirmLoading = {
        start: () => {
            confirmItems.button.loading.classList.remove("d-none");
            confirmItems.button.loading.classList.add("animate__fadeInUp");
        },
        stop: () => {
            confirmItems.button.loading.classList.add("d-none");
            confirmItems.button.loading.classList.remove("animate__fadeInUp");
        }
    }
    confirmItems.button.confirm.addEventListener("click", confirmSendCode);

    function confirmSendCode() {
        let wrongValue = false;
        let thisValue;
        for (let i = 0; i < confirmItems.inputs.length; i++) {
            thisValue = confirmItems.inputs[i].value;
            if (thisValue == "") {
                wrongValue = true;
                confirmItems.inputs[i].classList.add("confirm-wrong-code");
                break;
            } else if (isNaN(thisValue)) {
                wrongValue = true;
                confirmItems.inputs[i].classList.add("confirm-wrong-code");
                break;
            }
        }
        if (!wrongValue) {
            if (confirmSendTry <= 5) {
                confirmSendTry++;
                localStorage.setItem("confirmSendTry", confirmSendTry);
                confirmLoading.start();
                confirmTimer.stop();
                confirmItems.disabledLayer.classList.add("loading-mouse");
                confirmItems.disabledLayer.classList.remove("d-none");
                confirmItems.time.resend.classList.add("d-none");
                confirmItems.time.resend.classList.remove("animate__jello");
                for (let i = 0; i < confirmItems.inputs.length; i++) {
                    confirmItems.inputs[i].setAttribute("disabled", "disabled");
                }
                setTimeout(() => {
                    confirmStopSend();
                    confirmFakeError();
                }, 3000);
            } else {
                systemAlert.new({
                    type: "danger",
                    text: "You tried too many times, please try again later",
                    duration: 4000
                })
            }

        } else {
            systemAlert.new({
                type: "danger",
                text: "Please enter the code correctly",
                duration: 4000
            })
        }
    }

    function confirmStopSend() {
        confirmLoading.stop();
        confirmTimer.continueTimer();
        confirmItems.disabledLayer.classList.remove("loading-mouse");
        confirmItems.disabledLayer.classList.add("d-none");
        if (confirmItems.time.minute.innerText == 0 && confirmItems.time.second.innerText == 00) {
            confirmItems.time.resend.classList.remove("d-none");
        };
        confirmItems.time.resend.classList.remove("animate__jello");
        for (let i = 0; i < confirmItems.inputs.length; i++) {
            confirmItems.inputs[i].removeAttribute("disabled");
        };
    }

    const confirmError = {
        codeError: () => {
            for (let i = 0; i < confirmItems.inputs.length; i++) {
                confirmItems.inputs[i].classList.add("confirm-wrong-code");
            }
        },
    }

    // fake error
    function confirmFakeError() {
        confirmError.codeError();
        systemAlert.new({
            type: "danger",
            text: "The entered code is invalid",
            duration: 4000
        })
    }

    // edit number;
    confirmItems.edit.editBtn.addEventListener("click", () => {
        confirmTabs.edit.open();
        confirmTabs.confirm.close();
        confirmItems.edit.input.value = userPhone;
    })
    confirmItems.edit.cancelBtn.addEventListener("click", () => {
        confirmTabs.edit.close();
        confirmTabs.confirm.open();
        confirmItems.edit.input.classList.remove("is-invalid")
    })

    var confirmTabsTimer = setTimeout(() => {}, 0);
    const confirmTabs = {
        edit: {
            open: () => {
                clearTimeout(confirmTabsTimer);
                confirmItems.edit.editMain.classList.remove("animate__fadeOutRight");
                confirmItems.edit.editMain.classList.remove("d-none");
                confirmItems.edit.editMain.classList.add("animate__fadeInRight");
                confirmItems.container.classList.add("confirm-height-2");
            },
            close: () => {
                clearTimeout(confirmTabsTimer);
                confirmItems.edit.editMain.classList.remove("animate__fadeInRight");
                confirmItems.edit.editMain.classList.add("animate__fadeOutRight");
                confirmItems.container.classList.remove("confirm-height-2");
                confirmTabsTimer = setTimeout(() => {
                    confirmItems.edit.editMain.classList.add("d-none");
                }, 500);
            }
        },
        confirm: {
            open: () => {
                clearTimeout(confirmTabsTimer);
                confirmItems.confirmMain.classList.remove("animate__fadeOutLeft");
                confirmItems.confirmMain.classList.remove("d-none");
                confirmItems.confirmMain.classList.add("animate__fadeInLeft");
            },
            close: () => {
                clearTimeout(confirmTabsTimer);
                confirmItems.confirmMain.classList.remove("animate__fadeInLeft");
                confirmItems.confirmMain.classList.add("animate__fadeOutLeft");
                confirmTabsTimer = setTimeout(() => {
                    confirmItems.confirmMain.classList.add("d-none");
                }, 500);
            }
        }
    }

    confirmItems.edit.saveBtn.addEventListener("click", confrimEditCheckPhone);

    function confrimEditCheckPhone() {
        let phone = confirmItems.edit.input.value;
        if (phone.length == 12) {
            if (phone.slice(0, 2) == "98") {
                confirmEditNumber(phone);
            } else {
                systemAlert.new({
                    type: "danger",
                    text: "The format of the number is not correct, it must have 12 digits that are numbered without 0 and the beginning is 98",
                    duration: 4000
                })
                confirmItems.edit.input.classList.add("is-invalid");
            }
        } else {
            systemAlert.new({
                type: "danger",
                text: "The format of the number is incorrect, It must be 12 digits long and shouldn't start with 0 but with 98",
                duration: 4000
            })
            confirmItems.edit.input.classList.add("is-invalid");
        }
    }

    confirmItems.edit.input.addEventListener("keydown", (e) => {
        if (e.key == "Enter" || e.code == "Enter") {
            confrimEditCheckPhone();
        } else {
            confirmItems.edit.input.classList.remove("is-invalid");
        }
    });

    function confirmEditNumber(phone) {
        if (userPhone != phone) {
            if (confirmEditTry <= 3) {
                confirmEditTry++;
                localStorage.setItem("confirmEditTry", confirmEditTry);
                confirmItems.number.innerHTML = phone;
                confirmTimer.start("2", "00");
                confirmTabs.edit.close();
                confirmTabs.confirm.open();
                userPhone = phone;
                systemAlert.new({
                    type: "info",
                    text: "Mobile number changed successfully",
                    duration: 3000
                })
            } else {
                systemAlert.new({
                    type: "danger",
                    text: "You tried too many times, please try again later",
                    duration: 4000
                })
                confirmTabs.edit.close();
                confirmTabs.confirm.open();
            }
        } else {
            confirmTabs.edit.close();
            confirmTabs.confirm.open();
        }
    }
}