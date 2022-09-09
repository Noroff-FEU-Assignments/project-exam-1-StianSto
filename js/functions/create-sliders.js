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