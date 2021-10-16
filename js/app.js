let header = document.getElementById("navbar");
let sections = [...document.querySelectorAll("section")];
let navMenus = document.querySelector(".nav-links .nav-menu");
let toggleBtn = document.querySelector(".right-col .mobile-icon");
let mobileNavMenu = document.querySelector("header ul");

/**
 * Helper functions to get the id from the link href
 * @param {str} string to remove the hashtag from
 * @returns
 */
function hash(str) {
  return str.slice(str.lastIndexOf("#") + 1);
}
// console.log(sections);

/**
 * Function the Toggle menu to make it work on screens below 1280px
 */
function toggleMenu() {
  mobileNavMenu.classList.toggle("mobile-nav");
}

/**
 * for loop to add the li's to the ul element
 */
let frangment = document.createDocumentFragment();
for (let section of sections) {
  let listItem = document.createElement("li");
  let link = document.createElement("a");
  link.textContent = section.dataset.title;
  link.href = `#${section.getAttribute("id")}`;
  listItem.appendChild(link);
  listItem.setAttribute("data-nav", section.getAttribute("id"));
  frangment.appendChild(listItem);
}
navMenus.appendChild(frangment);
// console.log(frangment);
/**
 * addEventListener to toggle the class fixed and absolute to make the header appear on scroll
 */
document.addEventListener("scroll", function () {
  if (window.scrollY > 230) {
    header.classList.add("fixed");
    header.classList.remove("absolute");
  } else {
    header.classList.remove("fixed");
    header.classList.add("absolute");
  }
  isInViewport(sections);
});
/**
 * addEventListener to add the click function to nav menu buttons
 */
navMenus.addEventListener(
  "click",
  function (e) {
    if (e.target.nodeName.toLowerCase() === "a") {
      e.preventDefault();
      [...navMenus.children].map((listItem) =>
        listItem.classList.remove("active")
      );
      e.target.parentElement.classList.add("active");
      let location = e.target.href;
      sections.forEach((section) => {
        section.classList.remove("active");
        // console.log(
        //   section.getAttribute("id") === location.slice(0, -1) && section
        // );
      });

      // console.log(document.getElementById(hash(location)));
      document
        .getElementById(hash(location))
        .scrollIntoView({ behavior: "smooth", block: "start" });
      // mobileNavMenu.classList.remove("mobile-nav");
    }
  },
  true
);
/**
 * Add event to fire the click on the mobile menu button to toggle the menu
 */
toggleBtn.addEventListener("click", toggleMenu);
/**
 * Cheek if Section is in viewPort or not
 * @param {sections} array to loop through and check if section is inViewPort or not
 */

function isInViewport(sections) {
  let scrollPs = document.documentElement.scrollTop;
  // console.log(scrollPs);
  sections.forEach((section) => {
    if (
      scrollPs >= section.offsetTop - 50 &&
      scrollPs < section.getBoundingClientRect().height + section.offsetTop
    ) {
      sections.forEach((section) => section.classList.remove("active"));
      section.classList.add("active");
      [...navMenus.children].forEach((listItem) =>
        listItem.classList.remove("active")
      );
      document
        .querySelector("li[data-nav=" + section.getAttribute("id") + "]")
        .classList.add("active");
    }
  });
}
