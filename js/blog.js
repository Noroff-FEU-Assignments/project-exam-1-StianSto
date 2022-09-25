document.querySelector("#nav--blog-posts").classList.add("active")

const main = document.querySelector("main");    
const blogSection = document.querySelector(".blog-section");    
const topic = document.querySelector("#topic");
const sortBy = document.querySelector("#sort-by");
const search = document.querySelector("#input-search");
const filterBtn = document.querySelector("#filter-posts");
// filterBtn.addEventListener("click", createBlogPage)
filterBtn.addEventListener("click", filterPage);
search.addEventListener("keypress", (event) =>  {
    if (event.key === "Enter") {
        event.preventDefault();
        filterBtn.click();
    }
})
//create view more element
const viewMore = document.createElement('div')
viewMore.setAttribute("id", "view-more")
viewMore.innerHTML = `
    <div class="view-more-clickhandler" tabindex="0" href=""> 
        <p>click to view more</p>
        <i class="fa-solid fa-chevron-down"></i>
    </div>
`
function createViewMore() {
    blogSection.after(viewMore)
    const viewMoreClickHandler = document.querySelector(".view-more-clickhandler")
    viewMoreClickHandler.addEventListener("click", () => createBlogPage());
    viewMoreClickHandler.addEventListener("mouseenter", () => viewMoreClickHandler.classList.add("bounce-arrow"));
    viewMoreClickHandler.addEventListener("mouseleave", () => viewMoreClickHandler.classList.remove("bounce-arrow"));
}

// get values from query
const queryString = document.location.search;
const parameter = new URLSearchParams(queryString);
//// topic
const queryTopicid = parseFloat(parameter.get("topic"));
const setSelectedTopic = topic.querySelector(`[data-topic-id="${queryTopicid}"]`);
if (setSelectedTopic) { setSelectedTopic.selected = true; }
//// search 
const querySearch = parameter.get("search");
search.value = querySearch;
//

let response = [];
let pageIndex = 1;

function filterPage() {
    pageIndex = 1;
    loadContent();
}

let featuredArr = [];
async function getFeaturedPosts() {

    // get featured posts tag
    const urlTags = "https://www.snakesandbeans.com/wp-json/wp/v2/tags";
    const responseTags = await fetch(urlTags);
    const resultsTags = await responseTags.json();
    const editorsPickTag = resultsTags.find( tag => tag.slug === "editors-pick" );
    // get featured posts
    let fields = "id,title,excerpt,_links,_embedded";
    const urlFeaturedPosts = `https://www.snakesandbeans.com/wp-json/wp/v2/posts/?tags=${editorsPickTag.id}&_fields=${fields}&_embed=wp:featuredmedia`
    const featuredPosts = await fetch(urlFeaturedPosts);   
    featuredArr = await featuredPosts.json();
}


function updateUrl() {
    let itemsPerPage = 6;
    let topicValue = topic.selectedOptions[0].dataset.topicId;
    let searchValue = search.value.trim().replaceAll(" ", "+"); // creates a serachable string
    let sortByValue = sortBy.selectedOptions[0].dataset.filterSort;
    let sortByDirection = sortBy.selectedOptions[0].dataset.filterSortDirection;

    let fields = "id,title,_links,_embedded"
    let url = `https://www.snakesandbeans.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia&_fields=${fields}`
    if (itemsPerPage ) url += `&per_page=${itemsPerPage}`
    if (pageIndex) url += `&page=${pageIndex}`
    if (topicValue) url += `&categories=${topicValue}`
    if (searchValue) url += `&search=${searchValue}`
    if (sortByValue) url += `&orderby=${sortByValue}`
    if (sortByDirection) url += `&order=${sortByDirection}`
    return url
} 


async function preLoad(url) { response = await fetch(url); }
async function loadContent(){
    viewMore.remove();
    blogSection.innerHTML = `<div class="loading"></div><p class="loading--text">Brewing search results</p>`;
    let newURL = updateUrl();
    await preLoad(newURL);
    blogSection.innerHTML= "";
    createBlogPage();
    createViewMore();
}
loadContent();


async function createBlogPage() {
    const results = await response.json();
    const totalPages = parseFloat(response.headers.get("x-wp-totalPages"))
    createHtml(results, pageIndex, totalPages)

    if(pageIndex >= totalPages) return viewMore.remove() // guard clause check for last page}

    await getFeaturedPosts();
    addFeaturedPost(featuredArr);

    pageIndex++
    newURL = updateUrl()
    await preLoad(newURL)
}


function createHtml(arr) {
    const containerMosaic = document.createElement("div");
    containerMosaic.classList.add("container-mosaic");
    const flexMosaicLeft = document.createElement("div");
    flexMosaicLeft.classList.add("flex-mosaic");
    const flexMosaicRight = document.createElement("div");
    flexMosaicRight.classList.add("flex-mosaic");

    let index = 0;
    arr.forEach( i => {
        let featuredMedia = "";
        if (i._embedded["wp:featuredmedia"]) featuredMedia = i._embedded["wp:featuredmedia"][0].source_url

        let html = `
            <a href="post.html?id=${i.id}">
            <div class="tile">
                <div style="background-image:url(${featuredMedia})"class="tile__img"></div>
                <div class="tile__title"><h2>${i.title.rendered}</h2></div>
            </div>
            </a>
        `

        if(index % 2 === 0) flexMosaicLeft.innerHTML += html;
        else flexMosaicRight.innerHTML += html;

        //append to container
        containerMosaic.appendChild(flexMosaicLeft)
        containerMosaic.appendChild(flexMosaicRight)
        index++        
    })
    blogSection.appendChild(containerMosaic)
}

let featuredIndex = 0;
function addFeaturedPost(arr) {
    let post = arr[featuredIndex];
    let featuredMedia;
    if (post._embedded["wp:featuredmedia"]) featuredMedia = post._embedded["wp:featuredmedia"][0].source_url;

    let html = `
        <div class="featured-post__img" style="background-image: url(${featuredMedia})"></div>
        <div class="featured-post__text">
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
        </div>
    `


    const featuredPost = document.createElement("div")
    featuredPost.classList.add("featured-post")

    featuredPost.innerHTML = html;
    blogSection.appendChild(featuredPost)
    featuredIndex < arr.length ? featuredIndex++ : featuredIndex = 0; //resets index so there will always be a featured post

}

const filterItemsBtn = document.querySelector("#filter-items-btn");
const filterItemsContainer = document.querySelector("#filter-container");
filterItemsBtn.onclick = showFilter;
function showFilter() {
    filterItemsContainer.classList.toggle("open")
}