const viewMore = document.querySelector("#view-more");
const main = document.querySelector("main");


const viewMoreHeight = viewMore.clientHeight

function positionViewMore() {
    let positionViewMore = body.clientHeight - viewMoreHeight;
    viewMore.style.top = positionViewMore + "px";
}
positionViewMore();

main.addEventListener("click", () => insertPosts())
viewMore.addEventListener("click", () => insertPosts())

function insertPosts() {
console.dir(viewMore)

    html = `
    <div class="featured-post"></div>
    <div class="container-mosaic">
            <div class="flex-mosaic">
                <div class="tile tile--big">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>Best cafés in Norway</h2></div>
                </div>
                <div class="tile">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>Which beans Should you buy? a guide to the best beans</h2></div>
                </div>
                <div class="tile">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>AeroPress vs V60 vs French Press. who won?</h2></div>
                </div>
            </div>
            <div class="flex-mosaic">
                <div class="tile tile--big">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>AeroPress vs V60 vs French Press. who won?</h2></div>
                </div>
                <div class="tile">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>Brewing with V60: 10 useful tips and recipes</h2></div>
                </div>
                <div class="tile tile--small">
                    <div class="tile__img"></div>
                    <div class="tile__title"><h2>Best cafés in Norway</h2></div>
                </div>
            </div>
        </div>
    `

    main.innerHTML += html;

    positionViewMore();

}