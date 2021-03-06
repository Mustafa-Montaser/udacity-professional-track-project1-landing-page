/*
    *detect which section is visible in viewport
*/
// calback function to make an action when detect element in viewport
const callback = entries => {
    // check if section is visible in viewport
    if (entries[0].isIntersecting === true) {
        entries[0]["target"].querySelector("h2").style.color = "#F0E68C";
        entries[0]["target"].querySelector("h2").style.letterSpacing = "3px";
        entries[0]["target"].style.backgroundImage = "linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )";
        entries[0]["target"].querySelector("p").style.color = "#fff";
    } else {
        entries[0]["target"].querySelector("h2").style.color = "#fff";
        entries[0]["target"].querySelector("h2").style.letterSpacing = "0";
        entries[0]["target"].style.backgroundImage = "";
        entries[0]["target"].querySelector("p").style.color = "#8da099";
    } 
};
// creating new object of IntersectionObserver which detect if an element is visible in viewport or not
// threshold is ratio of visibility of element in viewport
var threshold_ = 0.95;
if (screen.width < 767) threshold_ = 0.4; // mobile screen
const observer = new IntersectionObserver(callback, { threshold: [threshold_] });
// select targets (sections) to applay that method on each of them
// const targets = document.querySelectorAll(".sectionsContainer > div section");
/////////////////////////////////////////////////////////////////////////////////////
/*
    checking content for nav bar 
    if links more than 8 links, nav bar will be with fixed height and scroll for hidden content 
    *this check is just if you want to create more than 8 section using above for loop
    or when add new section more than 8 
*/
const check_nav_list = () => {
    let numberOfAnchor = document.querySelectorAll("nav ul li").length;
    if (numberOfAnchor > 8) {
        document.querySelector("nav").style.height = "385px";
    }
};
// getting sections container and nav bar list
const sectionsContainer = document.querySelector(".sectionsContainer");
const navBarList = document.querySelector("nav ul");
/////////////////////////////////////////////////////////////////////////////////////
/*
    function to 1- create and add new section with its content as following
    h2 : header     hr : line     p : paragragh
    2- add section anchor link to nav bar 
*/
const add_new_section = i => {
    //create section container (div element) and set id for it
    let divContainer = document.createElement("div");
    divContainer.setAttribute("id", "sec" + i);

    // create section
    let section = document.createElement("section");

    // create h2 and fill it with text
    let h2 = document.createElement("h2");
    h2.textContent = "Section " + i;

    //create line (hr)
    let hr = document.createElement("hr");

    // create paragraph
    let p1 = document.createElement("p");
    p1.textContent =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ducimus numquam voluptate. Sitmaiores, officia impedit doloribus necessitatibus commodi quaerat accusamus aspernatur,autem eius culpa ipsam recusandae illum dolores error.";

    // appending element to the section
    section.appendChild(h2);
    section.appendChild(hr);
    section.appendChild(p1);

    // applay observer for created section to be detected when is visible in viewport
    observer.observe(section);

    // append section to div container
    divContainer.appendChild(section);

    // append div to the page
    sectionsContainer.appendChild(divContainer);

    //adding link for created section in nav bar
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", "#sec" + i);
    a.setAttribute("id", i);
    a.textContent = "Section " + i;
    li.appendChild(a);
    navBarList.appendChild(li);

    // check number of links in nav bar
    check_nav_list();
};
//////////////////////////////////////////////////////////////////////////
/*
    Adding three section at first when loading page. 
    and adding there links to nav bar
*/
for (let i = 1; i <= 3; i++) add_new_section(i);
////////////////////////////////////////////////////////////////////////////////////
/*
    setting for nav bar button and its click effect to nav bar
*/
const navBarBtn = document.querySelector("#navBarBtn");
navBarBtn.addEventListener("click", () => {
    if (navBarBtn.className == "navBarBtn") {
        // change style of nav bar button and its spans for rotation and X shape
        navBarBtn.className = "navBarBtnClick";
        document.querySelector(".l1").className = "l1click";
        document.querySelector(".l2").className = "l2click";
        document.querySelector(".l3").className = "l3click";
        document.querySelector(".nav").className = "navSlide";
    } else {
        navBarBtn.className = "navBarBtn";
        document.querySelector(".l1click").className = "l1";
        document.querySelector(".l2click").className = "l2";
        document.querySelector(".l3click").className = "l3";
        document.querySelector(".navSlide").className = "nav";
    }
});
////////////////////////////////////////////////////////////////////////////
/*
    Adding new secion when click "Add new section" button
*/
const addNewSection = document.querySelector("#addNewSec");
addNewSec.addEventListener("click", () => {
    let numerOfSections = document.querySelectorAll(".sectionsContainer div section").length;
    add_new_section(numerOfSections + 1);
    // applay click on section link to scroll page to it
    document.querySelectorAll(".sectionsContainer div")[numerOfSections].scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "start"
    });
});
/////////////////////////////////////////////////////////////////////////////////////
/*
    setting for move up button to move to the page top
    clear url from #id for any section id
*/
const moveUp = document.querySelector("#moveUp");
moveUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,  // scroll to top of the page
        behavior: "smooth"
    });
});
/////////////////////////////////////////////////////////////////////////////////////
/*
    listen to window scroll event to display or not,  moveUp button
*/
document.addEventListener("scroll", (e) => {
    if (window.scrollY >= 100) moveUp.style.display = "block";
    else moveUp.style.display = "none";
});
/////////////////////////////////////////////////////////////////////////////////////
/*
    listen to any item in the nav bar list
*/
document.querySelectorAll("nav ul li a").forEach((a) => {
    a.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".sectionsContainer div")[event.target.getAttribute("id") - 1].scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "start"
    });
    });
});
