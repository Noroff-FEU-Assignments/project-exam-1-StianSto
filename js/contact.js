// function submitFormToCF7() 

// const myUsername = "snakesa2"
// const mySecretKey = "Zp3C EcLd xivT pHtp xXKx OKAA";

//   // (A) URL & CREDENTIALS
// const credentials = btoa(`${myUsername}:${mySecretKey}`);
 


const url = "https://snakesandbeans.com/wp-json/contact-form-7/v1/contact-forms/115/"

// async function fetchContactForm() {
//     try {

//         const response = await fetch(url,{ 
//             headers: {
//                 "Authorization": `Basic ${credentials}`
//             }
//         } )
//         const results = await response.json();
//         console.log(results.properties.form.fields)
//     } catch (error) {
//         console.warn(error)
//     } 
// }
// fetchContactForm();




// const response = await fetch(url,{
//     method: form.method,
//     body: new FormData(form)
//     headers: {
//         "Authorization": `Basic ${credentials}`
//     }

const respondedMessage = document.createElement("p");
respondedMessage.classList.add("responded-message")

const main = document.querySelector("main");
const form = document.querySelector("form")

// form.addEventListener("submit", sendContactForm)



////// THIS WORKS! DO NOT DELETE! ///////
///// ps: append message to dataform

// async function sendContactForm(event) {
//     event.preventDefault();

//     const form = event.target;
//     let data = new FormData(form);
//     console.log(...data)
//     console.log(data.entries())

//     try {
//         const response = await fetch(url + "feedback", {
//             method: form.method,
//             body: new FormData(form)
//         });

//         if (response.status === 200) {
//             respondedMessage.innerText = "Your message has been sent. Thank you for your input";
//             respondedMessage.classList.add("success");
//         }
//     }   catch(error) {
//         console.warn(error)
//         respondedMessage.innerText = `there was a problem trying to send your message. error: ${response.status}: ${error}`
//         respondedMessage.classList.add("error");
//     } 

//     main.appendChild(respondedMessage);
// }





// form validation 
const yourName = document.querySelector("#your-name");
const yourEmail = document.querySelector("#your-email");
const yourSubject = document.querySelector("#your-subject");
const yourMessage = document.querySelector("#your-message");

function validateForm() {
    if(!validateName()) return false


    return true
}

function validateName() {}
function validateEmail() {}
function validateSubject() {}
function validateMessage() {}

const regexEmail = /\S+@\S+\.\S+/;

yourName.addEventListener("focusout", (e) => {
    if(e.target.value.length < 15) displayErrMsg(e.target)
})

yourEmail.addEventListener("focusout", (e) => {
    if(!regexEmail.test(e.target.value)) displayErrMsg(e)
})

yourSubject.addEventListener("focusout", (e) => {
    if(e.target.value.length < 15) displayErrMsg()
})

yourMessage.addEventListener("focusout", (e) => {
    if(e.target.value.length < 15) displayErrMsg() 
})


function displayErrMsg(element) {
    console.dir(element)
    console.log(element.value + " is not valid")
    let errorMsg = document.createElement("p");
    errorMsg.
    errorMsg.classList.add("error-msg")
    element.after(errorMsg)
}