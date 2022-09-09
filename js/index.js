import { createSliders } from "./script.js";

// fetch api
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
const postID = parseFloat(parameter.get("id"));
const url = `https://www.snakesandbeans.com/wp-json/wp/v2/posts/?per_page=10&_embed`;

const recentSlider = document.querySelector('.slider[data-slider="recent-posts"]')
const popularSlider = document.querySelector('.slider[data-slider="popular-posts"]');
console.dir(recentSlider)

async function fetchApi() {
    const response = await fetch(url);
    const results = await response.json();

    createSlider(results, recentSlider)
    createSlider(results, popularSlider)

    createSliders();

}
fetchApi();


function createSlider(array, slider) {

    let sliderIndicators = slider.nextElementSibling;
    console.log(slider)
    console.log(sliderIndicators)
    
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
                <div class="slider--post" data-slider="${sliderDataAttr}" data-slider-post-index="${postIndex}">
                    <div style= "background-image: url(${featuredMedia})" class="slider--post__img"></div>
                    <div class="slider--post__text">
                        <h3>${post.title.rendered}</h3>
                    </div>
                </div>
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
const popularSliderPost = popularSlider.querySelectorAll('.slider--post');

function setSlidePostWidth() {
    
    let containerWidth = popularSlider.getBoundingClientRect().width; 
    popularSliderPost.forEach(post => {
        post.style.width = containerWidth - 100 + "px";
    })   
}

setSlidePostWidth();
window.onresize = setSlidePostWidth;