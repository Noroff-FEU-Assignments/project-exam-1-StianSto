import { createSliders } from "./functions/create-sliders.js";

document.querySelector("#nav--home").classList.add("active")

let fieldsApi = "id,title,_links,_embedded";
const urlRecentTenPosts = `https://www.snakesandbeans.com/wp-json/wp/v2/posts/?per_page=10&_embed=wp:featuredmedia&_fields=${fieldsApi}`;
const recentSlider = document.querySelector('.slider[data-slider="recent-posts"]')
const editorsSlider = document.querySelector('.slider[data-slider="editors-pick-posts"]');

// fetch api
async function fetchTags() {
    const fieldsTags = "id,slug";
    const urlTags =`https://www.snakesandbeans.com/wp-json/wp/v2/tags?_fields=${fieldsTags}`
    const response = await fetch(urlTags);
    const results = await response.json(); 
    const editorsPickTag = results.find( tag => tag.slug === "editors-pick" ) 
    const editorsPickTagID = editorsPickTag.id
    const fieldsNewurl = "id,title,_links,_embedded"
    const newUrl = `https://snakesandbeans.com/wp-json/wp/v2/posts/?tags=${editorsPickTagID}&_embed=wp:featuredmedia,_fields=${fieldsNewurl}`

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

        if (post._embedded["wp:featuredmedia"]) featuredMedia = post._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
       
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

        sliderIndicators.innerHTML += `
            <span class="slider-indicator" data-slider="${sliderDataAttr}" data-slide-indicator="${postIndex}"></span>
        `

        postIndex += 1;

    })
    slider.innerHTML = html
    setSlidePostWidthEditorsPick();
} 

// set width on slider posts because container query are not yet fully supported
function setSlidePostWidthEditorsPick(slider) {
    const editorsSliderPost = editorsSlider.querySelectorAll('.slider--post');

    let containerWidth = editorsSlider.getBoundingClientRect().width; 
    editorsSliderPost.forEach( post => post.style.width = containerWidth - 100 + "px" )
}

// add picture to fun fact section
const urlFunFact = "https://www.snakesandbeans.com/wp-json/wp/v2/media/219?_fields=source_url";
const funFact = document.querySelector("#fun-fact");

async function getFunFactImg() {
    if(window.innerWidth < 769) return funFact.style.backgroundImage = "";
    const response = await fetch(urlFunFact)
    const result = await response.json();
    console.log(result)

    funFact.style.backgroundImage = `linear-gradient(90deg, rgba(38,10,0,1) 0%, rgba(38,10,0,1) 50%, rgba(38,10,0,0) 100%), url(${result.source_url})`;
}

funFact.onload = getFunFactImg();
window.onresize = () => {
    getFunFactImg();
    setSlidePostWidthEditorsPick();
}
