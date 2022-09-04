// make global header (must be on top)
const header = document.querySelector("header");
header.innerHTML = `
    <nav class="navbar">
    <div class="logo">
        <img src="assets/logo-the-daily-brew.svg" alt="">
    </div>
    <div id="testmenu">
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div id="primary-nav" class=".show-nav">
        <i class="nav-close fa-solid fa-xmark"></i>
        <div class="nav-search">
            <button class="btn btn btn--search btn--tactile"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" placeholder="search here">
        </div>
        <ul class=" | margin-inline">
            <li id="nav--home"class="active"><a href="">Home</a></li>
            <li id="nav--blog-posts"><a href="">Blog Posts</a></li>
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
}

const testMenu = document.querySelector("#testmenu");

testMenu.addEventListener("click", openNav);
//


// slider
const btnSlider = document.querySelectorAll(".btn--arrow");
const sliders = document.querySelectorAll(".slider");

btnSlider.forEach( e => {
    e.addEventListener("click", scrollSlider)
})

function scrollSlider(btn) {
    let btnTarget = btn.target;
    let slideDirection = btnTarget.dataset.slideDirection

    sliders.forEach( e => {
        if(e.dataset.slider === btnTarget.dataset.slider){
            let containerWidth = e.getBoundingClientRect().width;
            if (slideDirection === "right")e.scrollLeft += containerWidth * 0.7;
            if (slideDirection === "left")e.scrollLeft -= containerWidth * 0.7;
        }
    })
}
//

