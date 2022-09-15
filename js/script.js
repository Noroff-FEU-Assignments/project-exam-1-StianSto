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
                <ul id="nav--topics__menu"></ul>
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


async function topicsNavbar() {
    const topicsMenu = document.querySelector("#nav--topics__menu");
    const urlTopics = "https://snakesandbeans.com/wp-json/wp/v2/categories"
    const response = await fetch(urlTopics);
    const results = await response.json();
    let html = "";
    results.forEach( topic => {
        if (topic.id === 1 ) return; // skips uncategorized category
        html += `<li><a href="blog.html?topic=${topic.id}">${topic.name}</a></li>`
    })
    topicsMenu.innerHTML = html;


    const topicsList = document.querySelector(".topics-section ul");
    if(topicsList) topicsListInsert(results, topicsList);

    
}
topicsNavbar();

async function topicsListInsert(topics, container) {
        // uses same results on index page and others who have a topics-list
   
        const urlMedia = "https://snakesandbeans.com/wp-json/wp/v2/media"
        const response = await fetch(urlMedia);
        const results = await response.json();

        let html = "";
        let mediaID ;
    
        topics.forEach( topic => {
            if (topic.id === 1 ) return; // skips uncategorized category
            // sets up for finding right media
            if (topic.id === 31) mediaID = 123;
            if (topic.id === 32) mediaID = 117;
            if (topic.id === 33) mediaID = 124;

            let topicMedia = results.find( media => media.id === mediaID)
            console.log(topicMedia)
            let sourceUrl = topicMedia.media_details.sizes.medium_large.source_url;
            console.log(sourceUrl)

            html += `
            <li>
                <a href="blog.html?topic=${topic.id}">
                    <div class="topics-section__img" data-topic-id="${topic.id}" style="background-image:url(${sourceUrl})"></div>
                    <h3 class="topics-section__title">${topic.name}</h3>
                </a>
            </li>`
        })
        container.innerHTML = html;   
}

