// make global header (must be on top)
const header = document.querySelector("header");
header.innerHTML = `
    <nav class="navbar">
    <a href="index.html" class="logo">
        <img src="assets/logo-the-daily-brew.svg" alt="">
    </a>
    <div id="primary-nav-btn" aria-expanded="false">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
    <div id="primary-nav">
        <div class="nav-search">
            <button class="btn btn btn--search btn--tactile" aria-label="search button"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" id="search-field" placeholder="search here">
        </div>
        <ul class=" | margin-inline" aria-label="primary navigation links">
            <li id="nav--home"><a href="../index.html">Home</a></li>
            <li id="nav--blog-posts"><a href="../blog.html">Blog Posts</a></li>
            <li id="nav--topics" tabindex="0" aria-label="list of topics, hit enter to expand" aria-expanded="false"><span>Topics</span ><i class="fa-solid fa-chevron-down"></i>
                <ul id="nav--topics__menu"></ul>
            </li>
            <li id="nav--contact"><a href="contact.html">Contact</a></li>
            <li id="nav--about"><a href="about.html">About</a></li>
        </ul>
    </div>
    </nav>
`

const footer = document.querySelector("footer");
footer.innerHTML = `
    <p>All rights reserved &copy;</p>
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
const primaryNavBtn = document.querySelector("#primary-nav-btn");
const navBtnClose = document.querySelector(".nav-close");
const navTopicsContainer = document.querySelector("#nav--topics");
const navTopics = document.querySelector("#nav--topics span");
const navTopicsMenu = document.querySelector("#nav--topics__menu");

navTopicsContainer.addEventListener("mouseover", openTopicsMenu);
navTopicsContainer.addEventListener("mouseleave", closeTopicsMenu);
navTopicsMenu.addEventListener("mouseenter", openTopicsMenu);
navTopicsMenu.addEventListener("mouseleave", closeTopicsMenu);
navTopics.addEventListener("touchend", toggleTopicsMenu);
// ARIA-enabled
navTopics.addEventListener("keypress", toggleTopicsMenu);

function openTopicsMenu() {navTopicsMenu.classList.add("open")};
function closeTopicsMenu() {navTopicsMenu.classList.remove("open")};
function toggleTopicsMenu() { 
    navTopicsMenu.classList.toggle("open");
    navTopics.ariaExpanded === "true" ? navTopics.ariaExpanded = "false" : navTopics.ariaExpanded = "true";
};

// navBtnClose.addEventListener("click", openNav);

function openNav() {
    primaryNav.classList.toggle("show-nav");
    body.classList.toggle("disable-scroll")
    primaryNavBtn.ariaExpanded === "true" ? primaryNavBtn.ariaExpanded = "false" : primaryNavBtn.ariaExpanded = "true";
    primaryNav.className === "show-nav" ? "hidden" : "show-nav";
}


primaryNavBtn.addEventListener("click", openNav);


async function topicsNavbar() {
    const topicsMenu = document.querySelector("#nav--topics__menu");
    const urlTopics = "https://snakesandbeans.com/wp-json/wp/v2/categories?_fields=id,name"
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
            if (topic.id === 31) mediaID = 224;
            if (topic.id === 32) mediaID = 226;
            if (topic.id === 33) mediaID = 225;

            let topicMedia = results.find( media => media.id === mediaID)
            let sourceUrl = topicMedia.source_url;

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

