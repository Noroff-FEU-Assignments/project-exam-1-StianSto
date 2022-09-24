import { imageModal } from "./functions/image-modal.js";

const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parseFloat(parameter.get("id"));
const article = document.querySelector("article")
const currentPage = document.querySelector("#current-page")
const h1 = document.querySelector("h1")
const featuredImg = document.querySelector("#hero-picture"); 

let featuredImgSize = featuredImg.getBoundingClientRect().width; 

// fetch api 
const url = `https://www.snakesandbeans.com/wp-json/wp/v2/posts/${postID}?_embed`;
// wordpress api orderby default is: orderby=date which retrieves the most recent posts

// fetch api and push results into createPost function
async function fetchApi() {
    const response = await fetch(url);
    const post = await response.json();
    console.log(post)

    // check if featureed image is embedded


    let featuredImg = "";
    if (post._embedded["wp:featuredmedia"]) {
        // load image with appropriate size
        featuredImgSize > 800 
            ? featuredImg += post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url
            : featuredImg += post._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
    }
    createPost(post, featuredImg)    

    // add modal eventlisteners
    imageModal(article);
}
fetchApi();



function createPost(post, img) {

    // insert title, h1 and featured image (hero)
    document.title = post.title.rendered + " | The Daily Brew"
    h1.innerText = post.title.rendered
    featuredImg.style.backgroundImage = `url("${img}")`

    article.innerHTML = post.content.rendered
    currentPage.innerText = "blog-post: " + post.title.rendered
}


// retrieve comments

async function retrieveComments() {
    const commentsContainer = document.querySelector(".comments");
    let commentsPageIndex = 1;
    const commentsUrl = `https://snakesandbeans.com/wp-json/wp/v2/comments/?post=${postID}&per_page=2&page=${commentsPageIndex}&_fields=author_name,date,content`;
    const response = await fetch(commentsUrl);
    const totalPages = parseFloat(response.headers.get("x-wp-totalPages"))
    const commentsResults = await response.json();
    console.log(commentsResults.length)
    console.log(totalPages)

    if (commentsResults < 1) return; //exit function if there are no comments 

    let html = "";
    commentsResults.forEach( comment => {
        let date = comment.date.substring(0, 10)
        html += `
            <div class="comment__post">
                <div class="comments__profile">
                    <div class="comments__profile-img"></div>
                    <div class="comments__profile-info">
                        <p class="comments__profile-username">${comment.author_name}</p>
                        <p class="comments__post-date">posted: ${date}</p>
                    </div>
                </div>
                <p class="comment__content">${comment.content.rendered}</p>
            </div>
        `
    })

    if (totalPages > 1) {
        commentsContainer.innerHTML = `
            <div class="comments__pagination">
                <button class="btn btn--arrow fa-solid fa-chevron-left"></button>
                <span class="comments__page-index">${commentsPageIndex}</span>
                <button class="btn btn--arrow  fa-solid fa-chevron-right"></button>
            </div>
        `
    }
    commentsContainer.innerHTML += html;

}

document.onload = retrieveComments();



// Comments section
const form = document.querySelector("form");
form.addEventListener("submit", postComment)

async function postComment(e) {
    e.preventDefault();


    const authorName = document.querySelector("#author-name");
    const content = document.querySelector("#comment-content");
    let username;
    authorName.value.length > 0 ? username = authorName.value : username = "anonymous";

    const data = JSON.stringify({
        post: postID,
        author_name: username,
        content: content.value,
    });

    const urlComments = "https://snakesandbeans.com/wp-json/wp/v2/comments"
    const response = await fetch(urlComments, {
        method: form.method,
        headers: {
        'Content-Type': 'application/json',
        },
        body: data
    })
    form.reset();
}