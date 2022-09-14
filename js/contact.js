const url = "https://snakesandbeans.com/wp-json/contact-form-7/v1/contact-forms/115/"

const respondedMessage = document.createElement("p");
respondedMessage.classList.add("responded-message")

const main = document.querySelector("main");
const form = document.querySelector("form")

form.addEventListener("submit", sendContactForm)

async function sendContactForm(event) {
    event.preventDefault();
    if(!checkFormValidation()) return alert("form is not complete ot valid")
    // const form = event.target;

    try {
        const response = await fetch(url + "feedback", {
            method: form.method,
            body: new FormData(form)
        });

        if (response.status === 200) {
            respondedMessage.innerText = "Your message has been sent. Thank you for your input";
            respondedMessage.classList.add("success");

            main.innerHTML = "";
        }
    }   catch(error) {
        console.warn(error)
        respondedMessage.innerText = `there was a problem trying to send your message. error: ${response.status}: ${error}`
        respondedMessage.classList.add("error");
    } 
    console.dir(respondedMessage)
    console.log(respondedMessage)
    main.appendChild(respondedMessage)
    main.innerHTML += `

    `
}




// form validation 
const yourName = document.querySelector("#your-name");
const yourEmail = document.querySelector("#your-email");
const yourSubject = document.querySelector("#your-subject");
const yourMessage = document.querySelector("#your-message");

const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
let err;

// check field when leaving field
yourName.addEventListener("focusout", (e) => {
    err = "at least 5 characters needed"
    e.target.value.length >= 5 ? inputIsValid(e.target) : displayErrMsg(e.target, err) 
})

yourEmail.addEventListener("focusout", (e) => {
    console.log(regexEmail.test(e.target.value))
    e.target.value && regexEmail.test(e.target.value) ? inputIsValid(e.target) : displayErrMsg(e.target, checkEmail(e.target))
})

yourSubject.addEventListener("focusout", (e) => {
    err = "at least 15 characters needed"
    e.target.value.length >= 15 ? inputIsValid(e.target) : displayErrMsg(e.target, err) 
})

yourMessage.addEventListener("focusout", (e) => {
    err = "at least 25 characters needed"
    e.target.value.length >= 25 ? inputIsValid(e.target) : displayErrMsg(e.target, err) 
})




function displayErrMsg(e, msg) {

    if (!e.value) return e.dataset.valid = "";
    e.dataset.valid = "false"

    let errorMsg

    if(e.nextElementSibling) errorMsg = e.nextElementSibling
    else errorMsg = document.createElement("p");

    errorMsg.innerText = msg;
    errorMsg.classList.add("error-msg")
    e.after(errorMsg)
    console.dir(e)
}

function checkFormValidation() {

    const inputValidation = document.querySelectorAll('[data-valid]')
    let validity 
    inputValidation.forEach( e => {
        validity = e.dataset.valid
        console.log(validity)
    })   
    return validity;
}

function inputIsValid(e){
    e.dataset.valid = true;
    let errorMsg = e.nextElementSibling;
    errorMsg.remove();
}


// check email function that can display some common issues with want went wrong.
function checkEmail(e) {
    if(!e.value.includes("@")) return '"@" is not included.';
    if(!e.value.includes(".")) return '"." is not included.';
    return "email is not valid. valid example: name@email.com"
}

