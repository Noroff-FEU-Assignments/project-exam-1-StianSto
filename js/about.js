import { imageModal } from "./functions/image-modal.js";

document.querySelector("#nav--about").classList.add("active")

const fields = "id,date,title,content,author"
const aboutUrl = `https://snakesandbeans.com/wp-json/wp/v2/pages/201?fields=${fields}`;
const article = document.querySelector("article")

async function fetchApi() {
    const response = await fetch(aboutUrl);
    const results = await response.json();
    article.innerHTML = results.content.rendered

    // add modal to all images
    imageModal(article)
}

fetchApi();
