const url = "https://snakesandbeans.com/wp-json/contact-form-7/v1/contact-forms/115/"

const respondedMessage = document.createElement("p");
respondedMessage.classList.add("responded-message")

const main = document.querySelector("main");
const form = document.querySelector("form")

form.addEventListener("submit", sendContactForm)

async function sendContactForm(event) {
    event.preventDefault();
    if(!checkFormValidation()) return alert("form is not complete ot valid")
    console.log(2)

    const form = event.target;
    let data = new FormData(form);
    console.log(...data)
    console.log(data.entries())

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
   
}




// form validation 
const yourName = document.querySelector("#your-name");
const yourEmail = document.querySelector("#your-email");
const yourSubject = document.querySelector("#your-subject");
const yourMessage = document.querySelector("#your-message");

const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
let errmsg;

// check field when leaving field
yourName.addEventListener("focusout", (e) => {
    errmsg = "at least 5 characters needed"
    e.target.value.length > 5 ? e.target.dataset.valid = true : displayErrMsg(e.target, errmsg) 
})

yourEmail.addEventListener("focusout", (e) => {
    console.log(regexEmail.test(e.target.value))
    e.target.value && regexEmail.test(e.target.value) ? e.target.dataset.valid = true  : checkEmail(e.target, errmsg)
})

yourSubject.addEventListener("focusout", (e) => {
    e.target.value.length > 15 ? e.target.dataset.valid = true  : displayErrMsg(e.target, errmsg) 
})

yourMessage.addEventListener("focusout", (e) => {
    e.target.value.length > 25 ? e.target.dataset.valid = true  : displayErrMsg(e.target, errmsg) 
})




function displayErrMsg(e, msg) {
    if (!e.value) return e.dataset.valid = "";
    e.dataset.valid = "false"
    console.log(msg)
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


function checkEmail(e) {

    if(e.value.includes("@") === false ) return console.log("@ is not included")
    console.log("@")
}