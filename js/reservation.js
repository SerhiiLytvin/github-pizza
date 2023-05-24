"use strict";

const inputName = document.querySelector(".inputBlock__name");
const inputEmail = document.querySelector(".inputBlock__email");
const inputPhone = document.querySelector(".inputBlock__phone");
const inputData = document.querySelector(".inputBlock__dateTime");

const sendBtn = document.querySelector(".booking-form_btn");

inputName.addEventListener("change", checkName);
inputEmail.addEventListener("change", checkEmail);
sendBtn.addEventListener("click", sendEmail);

function checkName(e) {
  let name = this.value;
  if (name) {
    for (let i = 0; i < name.length; i++) {
      let code = name.charCodeAt(i);
      if (
        !(
          (code >= 65 && code <= 90) ||
          (code >= 97 && code <= 122) ||
          code === 32
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have entered incorrect name: " + name,
          footer: "Please, re-enter!",
        });
        this.value = "";
        return;
      }
    }
  }
}

function checkEmail(e) {
  let email = this.value;
  if (email) {
    let lDog = false;
    for (let i = 0; i < email.length; i++) {
      let code = email.charCodeAt(i);
      if (code === 64) {
        lDog = true;
        break;
      }
    }
    if (!lDog) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have entered incorrect email: " + email,
        footer: "Please, re-enter!",
      });
      this.value = "";
      return;
    }
  }
}

function sendEmail(e) {
  if (
    !inputName.value ||
    !inputEmail.value ||
    !inputPhone.value ||
    !inputData.value
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields should be filled in: ",
      footer: "Please, enter!",
    });
  }
}
