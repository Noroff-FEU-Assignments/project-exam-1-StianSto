const main = document.querySelector("main");    
const blogSection = document.querySelector(".blog-section");    
const topic = document.querySelector("#topic");
const sortBy = document.querySelector("#sort-by");
const search = document.querySelector("#input-search");
const filterBtn = document.querySelector("#filter-posts") 
// filterBtn.addEventListener("click", createBlogPage)
filterBtn.addEventListener("click", filterPage);
search.addEventListener("keypress", (event) =>  {
    if (event.key === "Enter") {
        event.preventDefault();
        filterBtn.click();
    }
})

let response = [];
let pageIndex = 1;

function filterPage() {
    pageIndex = 1;
    loadContent();
}

function updateUrl() {
    let itemsPerPage = 4;
    let topicValue = topic.value;
    let searchValue = search.value.trim().replaceAll(" ", "+"); // creates a serachable string
    let sortByValue = sortBy.value;

    let url = `https://www.snakesandbeans.com/wp-json/wp/v2/posts?_embed`
    if (itemsPerPage ) url += `&per_page=${itemsPerPage}`
    if (pageIndex) url += `&page=${pageIndex}`
    if (topicValue) url += `&categories=${topicValue}`
    if (searchValue) url += `&search=${searchValue}`
    if (sortByValue) url += `&orderby=${sortByValue}`
    return url
} 


async function preLoad(url) { response = await fetch(url); }

async function loadContent(){
    blogSection.innerHTML = "please wait while the site is brewing :)";
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

    console.log(results)
    console.log(pageIndex)
    console.log(totalPages)
    createHtml(results, pageIndex, totalPages)

    if(pageIndex >= totalPages) return viewMore.remove() // guard clause check for last page}
    addFeaturedPost();

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


const viewMore = document.createElement('div')
viewMore.setAttribute("id", "view-more")
viewMore.innerHTML = `
    <div class="view-more-clickhandler"> 
        <p>click to view more</p>
        <i class="fa-solid fa-chevron-down"></i>
    </div>
`

function createViewMore() {
    main.after(viewMore)
    const viewMoreClickHandler = document.querySelector(".view-more-clickhandler")
    viewMoreClickHandler.addEventListener("click", () => createBlogPage());
    viewMoreClickHandler.addEventListener("mouseenter", () => viewMoreClickHandler.classList.add("bounce-arrow"));
    viewMoreClickHandler.addEventListener("mouseleave", () => viewMoreClickHandler.classList.remove("bounce-arrow"));
}

function addFeaturedPost() {
    const featuredPost = document.createElement("div")
    featuredPost.classList.add("featured-post")
    featuredPost.innerHTML = "";
    blogSection.appendChild(featuredPost)
}