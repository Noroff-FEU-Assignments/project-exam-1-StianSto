// fetch api 
const url = `https://www.snakesandbeans.com/wp-json/wp/v2/posts?per_page=10`;
// wordpress api orderby default is: orderby=date which retrieves the most recent posts

// fetch api and push results into createPost function
async function fetchApi() {
    const response = await fetch(url);
    const post = await response.json();
    console.log(post)

    // check if featureed image is embedded
    let featuredImg = "";
    if (post._embedded["wp:featuredmedia"]) {
        featuredImg = post._embedded["wp:featuredmedia"][0].source_url
    }

    createPost(post, featuredImg)    

    // add modal eventlisteners
    modal();
}
fetchApi();



function createPost(post, img) {

    // insert title, h1 and featured image (hero)
    const h1 = document.querySelector("h1")
    const featuredImg = document.querySelector("#hero-picture"); 

    document.title = post.title.rendered + " | The Daily Brew"
    h1.innerText = post.title.rendered
    featuredImg.style.backgroundImage = `url("${img}")`

    article.innerHTML = post.content.rendered
}


// modal functions
function modal() {

    const images = article.querySelectorAll("img");

    images.forEach( img => {
        img.addEventListener("click", openModal)
})

const modal = document.createElement("div");
modal.addEventListener("click", closeModal)


function openModal() {

    modal.style.display = "flex"
    
    //clone targeted img and paste into modal 
    let img = this.cloneNode(true)
    const imgAlt = document.createElement("p");
    imgAlt.innerText = img.alt
    // const imgContainer = document.createElement("div")

    modal.classList.add("modal");
    console.log(imgAlt)
    
    modal.appendChild(img);
    modal.appendChild(imgAlt);
    // modal.appendChild(imgContainer)
    body.appendChild(modal)
    body.classList.add("disable-scroll")

    setTimeout( () => modal.style.opacity = "1", 0)
}

function closeModal(event) {

    const modal = document.querySelector(".modal")

    if(event.target !== modal) return console.log(2);

    modal.style.opacity = "0";
    setTimeout( () => {
        modal.style.display = "none"
        body.classList.remove("disable-scroll")
        modal.innerHTML = "";
    }, 300) 
}
}