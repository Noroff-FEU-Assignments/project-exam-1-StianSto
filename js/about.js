document.querySelector("#nav--about").classList.add("active")

const aboutUrl = "https://snakesandbeans.com/wp-json/wp/v2/pages/201";
const article = document.querySelector("article")

async function fetchApi() {
    const response = await fetch(aboutUrl);
    const results = await response.json();
    console.log(results.content.rendered)
    article.innerHTML = results.content.rendered
}

fetchApi();