// make global header (must be on top)
const header = document.querySelector("header");
header.innerHTML = `
    <nav class="navbar">
    <a href="index.html" class="logo">
        <img src="assets/logo-the-daily-brew.svg" alt="">
    </a>
    <div id="primary-nav-menu">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div id="primary-nav">
        <i class="nav-close fa-solid fa-xmark"></i>
        <div class="nav-search">
            <button class="btn btn btn--search btn--tactile"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" placeholder="search here">
        </div>
        <ul class=" | margin-inline">
            <li id="nav--home"class="active"><a href="../index.html">Home</a></li>
            <li id="nav--blog-posts"><a href="../blog.html">Blog Posts</a></li>
            <li id="nav--topics">Topics<i class="fa-solid fa-chevron-down"></i>
                <ul id="nav--topics__menu">
                    <li><a href="">Beans</a></li>
                    <li><a href="">Brewing</a></li>
                    <li><a href="">Café's</a></li>
                </ul>
            </li>
            <li id="nav--contact"><a href="">Contact</a></li>
            <li id="nav--about"><a href="">About</a></li>
        </ul>
    </div>
    </nav>
`
//


// navbar
const body = document.querySelector("body");
const primaryNav = document.querySelector("#primary-nav");
const navBtnClose = document.querySelector(".nav-close");
const navTopics = document.querySelector("#nav--topics");
const navTopicsMenu = document.querySelector("#nav--topics__menu");

navTopics.addEventListener("pointerover", openTopicsMenu);
navTopics.addEventListener("pointerleave", closeTopicsMenu);
navTopicsMenu.addEventListener("pointerenter", openTopicsMenu);
navTopicsMenu.addEventListener("pointerleave", closeTopicsMenu);
navTopics.addEventListener("touchend", toggleTopicsMenu);

function openTopicsMenu() {navTopicsMenu.style.display = "flex"};
function closeTopicsMenu() {navTopicsMenu.style.display = "none"};
function toggleTopicsMenu() {
    if(navTopicsMenu.style.display === "none" || !navTopicsMenu.style.display) {
        navTopicsMenu.style.display = "flex";
    } else {
        navTopicsMenu.style.display = "none";
    }
};

navBtnClose.addEventListener("click", openNav);

function openNav() {
    primaryNav.classList.toggle("show-nav");
    primaryNav.classList.remove("hidden");
    body.classList.toggle("disable-scroll")
}

const primaryNavMenu = document.querySelector("#primary-nav-menu");
primaryNavMenu.addEventListener("click", openNav);
//


// slider
const btnSlider = document.querySelectorAll(".btn--arrow");


function createSliders() {
    let visiblePosts = [];
    const sliders = document.querySelectorAll(".slider");
    const slidersPosts = document.querySelectorAll(".slider .slider--post");
    const sliderIndicators = document.querySelectorAll(".slider-indicator");


    sliders.forEach(slider => {
        // find explicit slider 
        const sliderDataAttr = slider.dataset.slider
        let postsArr = [];
        let indArr = [];
        
        // find relevant post to slider
        slidersPosts.forEach( post => {
            const postDataAttr = post.dataset.slider;
            if(postDataAttr === sliderDataAttr) postsArr.push(post);
        })

        // find relevant indicators to slider
        sliderIndicators.forEach( ind => {
            const indDataAttr = ind.dataset.slider;
            if(indDataAttr === sliderDataAttr) indArr.push(ind);
        })
        
        // feed results into function 
        connectPostAndIndicator(slider, postsArr, indArr)
        slider.addEventListener("scroll", () => connectPostAndIndicator(slider, postsArr, indArr));
    })


    function connectPostAndIndicator(slider, posts, indicators) {
        posts.forEach(post => postIsInView(slider, post, indicators))
    }

    function postIsInView(slider, element, indicators) {
        const elementRect = element.getBoundingClientRect();
        const sliderRect = slider.getBoundingClientRect();
        
        // check if post is visible in slider
        if (elementRect.left < (sliderRect.left) || 
        elementRect.right > (sliderRect.right))
        return visiblePosts.splice(element);

        if (visiblePosts.indexOf(element) === -1) visiblePosts.push(element);

        indicatorIsInView(indicators);
    }


    function indicatorIsInView(indicators) {
        let visibleIndArr = [];
        indicators.forEach( ind => {
            
            ind.classList.remove("slider-indicator--active");
            const indData = ind.dataset.slideIndicator;

            // check if indicator shares common index with visible posts
            visiblePosts.forEach( vp => {
                let visiblePostIndex = vp.dataset.sliderPostIndex;
                if(indData === visiblePostIndex && visibleIndArr.indexOf(ind) === -1) visibleIndArr.push(ind);
            })
        })

        visibleIndArr.forEach( e => e.classList.add("slider-indicator--active"))
    }


    // move slider on arrow btn click
    btnSlider.forEach( e => e.addEventListener("click", scrollSliderClick))

    function scrollSliderClick(btn) {
        let btnTarget = btn.target;
        let slideDirection = btnTarget.dataset.slideDirection;

        sliders.forEach( e => {
            if(e.dataset.slider !== btnTarget.dataset.slider) return;

            let slidersPosts = e.querySelector(".slider--post");
            const slidersPostsWidth = slidersPosts.getBoundingClientRect().width;
            if (slideDirection === "prev") e.scrollLeft -= slidersPostsWidth; 
            if (slideDirection === "next") e.scrollLeft += slidersPostsWidth; 
            
        })
    }
}

export {createSliders};