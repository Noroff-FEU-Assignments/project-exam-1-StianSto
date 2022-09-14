import { createSliders } from "./functions/create-sliders.js";

document.querySelector("#nav--home").classList.add("active")

const urlTags = "https://www.snakesandbeans.com/wp-json/wp/v2/tags"
const urlRecentTenPosts = `https://www.snakesandbeans.com/wp-json/wp/v2/posts?per_page=10&_embed`;
const recentSlider = document.querySelector('.slider[data-slider="recent-posts"]')
const editorsSlider = document.querySelector('.slider[data-slider="editors-pick-posts"]');

// fetch api
async function fetchTags() {
    // get id for tag
    let response = await fetch(urlTags);
    let results = await response.json(); 
    const editorsPickTag = results.find( tag => tag.slug === "editors-pick" ) 
    const editorsPickTagID = editorsPickTag.id
    const newUrl = `https://snakesandbeans.com/wp-json/wp/v2/posts?tags=${editorsPickTagID}&_embed`

    fetchApi(newUrl, editorsSlider)
}

async function fetchApi(url, slider) {
    let response = await fetch(url);
    const results = await response.json();

    createSlider(results, slider)
    createSliders();
}
fetchApi(urlRecentTenPosts, recentSlider);
fetchTags();


function createSlider(array, slider) {

    let sliderIndicators = slider.nextElementSibling;
    let html = "";
    let postIndex = 0;
    let featuredMedia = "";
    let sliderDataAttr = slider.dataset.slider

    array.forEach( post => {

        // sets default image for post image, and checks ig featured image has been embedded to post api. overwrites deafult and adds the embedded image.
        featuredMedia = "../assets/images/stock-photo-coffee-in-blue-cup-on-wooden-table-in-cafe-with-lighting-background-1387420256.jpg"
        if (post._embedded["wp:featuredmedia"]) featuredMedia = post._embedded["wp:featuredmedia"][0].source_url
       
        //create html for post. 
        html += `
            <li> 
                <a href="post.html?id=${post.id}">
                    <div class="slider--post" data-slider="${sliderDataAttr}" data-slider-post-index="${postIndex}">
                        <div style= "background-image: url(${featuredMedia})" class="slider--post__img"></div>
                        <div class="slider--post__text">
                            <h3>${post.title.rendered}</h3>
                        </div>
                    </div>
                </a>
            </li> 
        `
        // create indicator inside indicator container 
        sliderIndicators.innerHTML += `
            <span class="slider-indicator" data-slider="${sliderDataAttr}" data-slide-indicator="${postIndex}"></span>
        `

        postIndex += 1;

    })
    slider.innerHTML = html

} 


// set width on slider posts
const editorsSliderPost = editorsSlider.querySelectorAll('.slider--post');

function setSlidePostWidth() {
    
    let containerWidth = editorsSlider.getBoundingClientRect().width; 
    editorsSliderPost.forEach(post => {
        post.style.width = containerWidth - 100 + "px";
    })   
}

setSlidePostWidth();
window.onresize = setSlidePostWidth;