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

testMenu.addEventListener("click", openNav)