// this modal is meant for articls where a modal will open on click. right now should only be used with content rendered from wordpress rest api (such as posts or pages).
function imageModal(contentContainer) {
    const body = document.body;

    let images;
    if (contentContainer) images = contentContainer.querySelectorAll("img");
    if (images) images.forEach( img => img.addEventListener("click", openModal))

    const modal = document.createElement("div");
    modal.addEventListener("click", closeModal)


    function openModal() {

        modal.style.display = "flex"
        
        //clone targeted img and paste into modal 
        let img = this.cloneNode()
        const imgAlt = document.createElement("p");
        imgAlt.innerText = img.alt

        modal.classList.add("modal");
        
        modal.appendChild(img);
        modal.appendChild(imgAlt);
        body.appendChild(modal)
        body.classList.add("disable-scroll")

        setTimeout( () => modal.style.opacity = "1", 0)
    }

    function closeModal(event) {

        const modal = document.querySelector(".modal")
        if(event.target !== modal) return;

        modal.style.opacity = "0";
        setTimeout( () => {
            modal.style.display = "none"
            body.classList.remove("disable-scroll")
            modal.innerHTML = "";
        }, 300) 
    }
}


export {imageModal};