//get DOM elemets
const imageInput = document.querySelector("#upload-avatar");
const displayImage = document.querySelector("#icon-container");
let uploadedImage = "";
const ImagePreviewContainer = document.querySelector(".preview-file-upload");
const hideThings = document.querySelector(".upload-icon");
const instruction = document.getElementById("instruction");
const buttons = document.getElementById("buttons");

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    displayImage.style.background = `url(${uploadedImage})`;
    displayImage.style.backgroundSize = "cover";
    displayImage.style.backgroundPosition = "center";
  });
  reader.readAsDataURL(this.files[0]);

  imageInput.classList.add("hidden");
  instruction.classList.add("hidden");
  hideThings.classList.add("notVisible");
  buttons.classList.add("show");
});

//button element
const generateTicketBtn = document.getElementById("btn");

//fullname
const fullNameContainer = document.getElementById("full-name");
const inputs = document.querySelectorAll("#input-container input");
const fullNameErrorMessage = document.getElementById("fullname-error-message");

//email elements
const emailContainer = document.getElementById("email-address");
const emailErrorMessage = document.getElementById("email-error-message");

//github username elements
const usernameContainer = document.getElementById("github-username");
const usernameErrorMessage = document.getElementById(
  "githubusername-error-message"
);

//pages
const mainContainer = document.getElementById("main-container");
const formPage = document.getElementById("fm-container");
const ticketPage = document.getElementById("ticket-container");

//ticket container page code
const headingNotification = document.getElementById("h1-notification");
const subHeadingNotification = document.getElementById(
  "sub-heading-notification"
);
const ticketName = document.getElementById("name");
const username = document.getElementById("username");

//create a function expression to contain the logic
const validateFullName = () => {
  const fullname = fullNameContainer.value.trim();
  let isValid = true;

  //check if fullname container is empty
  if (fullname === "") {
    fullNameContainer.style.borderColor = "red";
    fullNameErrorMessage.classList.add("show");
    isValid = false;
  } else {
    fullNameErrorMessage.classList.remove("show");
  }

  //now make sure container doesn't accept digits
  const fullNameRegex = /^[A-Za-z\s]+$/;
  if (!fullname.match(fullNameRegex)) {
    fullNameErrorMessage.classList.add("show");
    fullNameContainer.style.borderColor = "red";
    isValid = false;
  } else {
    fullNameErrorMessage.classList.remove("show");
  }

  if (isValid) {
    fullNameContainer.style.borderColor = "";
  }

  return isValid;
};

const validateEmail = () => {
  const email = emailContainer.value.trim();
  let isValid = true;

  //make sure email container is not empty
  if (email === "") {
    emailContainer.style.borderColor = "red";
    emailErrorMessage.classList.add("show");
    isValid = false;
  } else {
    emailContainer.classList.remove("show");
  }

  //email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailRegex)) {
    emailErrorMessage.classList.add("show");
    emailContainer.style.borderColor = "red";
    isValid = false;
  } else {
    emailErrorMessage.classList.remove("show");
  }

  if (isValid) {
    emailContainer.style.borderColor = "";
  }

  return isValid;
};

const validateUsername = () => {
  const username = usernameContainer.value.trim();
  let isValid = true;

  if (username === "") {
    usernameContainer.style.borderColor = "red";
    usernameErrorMessage.classList.add("show");
    isValid = false;
  } else {
    usernameErrorMessage.classList.remove("show");
    usernameContainer.style.borderColor = "";
  }

  return isValid;
};

//activate button
generateTicketBtn.addEventListener("click", (event) => {
  //assign function expression to variables
  const isFullNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isUsernameValid = validateUsername();

  if (isFullNameValid && isEmailValid && isUsernameValid) {
    //pages
    formPage.style.display = "none";
    ticketPage.style.display = "block";

    headingNotification.innerHTML = `Congrats, ${fullNameContainer.value}. Your ticket is ready.`;
    subHeadingNotification.innerHTML = `We've emailed your ticket to ${emailContainer.value.trim()} and will send updates in the run up to the event.`;
    ticketName.innerHTML = `${fullNameContainer.value}`;
    username.innerHTML = `${usernameContainer.value}`;

    //clear input containers after 2 seconds
    setTimeout(() => {
      inputs.forEach((input) => (input.value = ""));
    }, 2000);
  } else {
    event.preventDefault();
  }
});
