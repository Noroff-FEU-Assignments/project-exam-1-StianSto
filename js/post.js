// fetch api 
const url = "https://www.snakesandbeans.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia";
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parseFloat(parameter.get("id"));
const article = document.querySelector("article")

console.log(postID)

async function fetchApi() {
    const response = await fetch(url);
    const results = await response.json();
    const post = results.find(post => post.id === postID)


    const featuredImg = post._embedded["wp:featuredmedia"][0].source_url
    console.log(featuredImg)
    createPost(post, featuredImg)
    

    // add modal eventlisteners
    modal();
}

fetchApi();

function createPost(post, img) {
    // insert title, h1 and featured image (hero)
    console.log(img)
    document.title = post.title.rendered
    const h1 = document.querySelector("h1")
    const featuredImg = document.querySelector("#hero-picture"); 
    h1.innerText = post.title.rendered
    featuredImg.style.backgroundImage = `url("${img}")`
    console.dir(featuredImg)

    // insert featured image



    article.innerHTML = post.content.rendered
}




function modal() {

const images = article.querySelectorAll("img");

images.forEach( img => {
    img.addEventListener("click", openModal)
})

const modal = document.createElement("div");
modal.addEventListener("click", closeModal)

function openModal() {
    console.log(2)
    modal.style.display = "flex"
    
    let img = this.cloneNode(true)
    modal.classList.add("modal");
    img.classList.add("copy-img");
    
    modal.appendChild(img);
    body.appendChild(modal)
    body.classList.add("disable-scroll")

    setTimeout( () => modal.style.opacity = "1", 0)
}

function closeModal(event) {
    console.log("running close modal")
    const modal = document.querySelector(".modal")

    if(event.target !== modal) return console.log(2);

    modal.style.opacity = "0";
    setTimeout( () => {
        modal.style.display = "none"
        body.classList.remove("disable-scroll")
        modal.innerHTML = "";
        modal.removeEventListener(all)
    }, 300) 
}
}