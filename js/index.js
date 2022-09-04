// set width on slider posts
const popularSlider = document.querySelector('.slider[data-slider="popular-posts"]');
const popularSliderPost = popularSlider.querySelectorAll('.slider--post');

function setSlidePostWidth() {
    
    let containerWidth = popularSlider.getBoundingClientRect().width; 
    popularSliderPost.forEach(post => {
        post.style.width = containerWidth - 100 + "px";
    })   
}

setSlidePostWidth();
window.onresize = setSlidePostWidth;