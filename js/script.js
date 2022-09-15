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
            <input type="text" id="search-field" placeholder="search here">
        </div>
        <ul class=" | margin-inline">
            <li id="nav--home"><a href="../index.html">Home</a></li>
            <li id="nav--blog-posts"><a href="../blog.html">Blog Posts</a></li>
            <li id="nav--topics">Topics<i class="fa-solid fa-chevron-down"></i>
                <ul id="nav--topics__menu">
                    <li><a href="blog.html?topic=31">Brewing</a></li>
                    <li><a href="blog.html?topic=32">Beans</a></li>
                    <li><a href="blog.html?topic=33">Café's</a></li>
                </ul>
            </li>
            <li id="nav--contact"><a href="contact.html">Contact</a></li>
            <li id="nav--about"><a href="about.html">About</a></li>
        </ul>
    </div>
    </nav>
`
//

const searchBtn = document.querySelector(".btn--search")
const searchField = document.querySelector("#search-field")
searchBtn.addEventListener("click", searchSite)
searchField.addEventListener("keypress", (event) => {if(event.key === "Enter") searchSite() })

function searchSite() { 
    window.location.href = `blog.html?search=${searchField.value}`;
}


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