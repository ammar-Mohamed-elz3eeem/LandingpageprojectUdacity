let header = document.getElementById("navbar");
let sections = [...document.querySelectorAll("section")].slice(1, -1);
let navMenus = document.querySelector(".nav-links .nav-menu");
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
 * Cheek if Section is in viewPort or not
 * @param {sections} array to loop through and check if section is inViewPort or not
 */
function isInViewport(sections) {
  let scrollPs = document.documentElement.scrollTop;
  sections.forEach((section) => {
    if (
      section.offsetTop <= scrollPs &&
      scrollPs < section.offsetTop + section.offsetHeight
    ) {
      [...navMenus.children].map((listItem) =>
        listItem.classList.remove("active")
      );
      document
        .querySelector(`li[data-nav="${section.getAttribute("id")}"]`)
        .classList.add("active");
    }
  });
}

/**
 * for loop to add the li's to the ul element
 */
let t0 = performance.now();
let frangment = document.createDocumentFragment();
for (let i = 0; i < 6; i++) {
  let listItem = document.createElement("li");
  listItem.setAttribute("data-nav", sections[i].getAttribute("id"));
  listItem.innerHTML = `<a href="#${sections[i].getAttribute("id")}">${
    sections[i].dataset.title
  }</a>`;
  frangment.appendChild(listItem);
}
navMenus.appendChild(frangment);
// console.log(frangment);
let t1 = performance.now();
console.log(t1 - t0);

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
      console.log(document.getElementById(hash(location)));
      document
        .getElementById(hash(location))
        .scrollIntoView({ behavior: "smooth" });
    }
  },
  true
);
