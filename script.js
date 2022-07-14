const toggleNavBtn = document.querySelector(".menu-toggle");
const toggleNavImg = document.querySelector("#toggle-menu-image");
const menu = document.querySelector(".nav-list");
const cardsContainer = document.querySelector(".cards__container");
const fullscreenDiv = document.querySelector(".fullscreen");
const fullscreenImage = document.querySelector("#fullscreen-img");

toggleNavBtn.addEventListener("click", toggleNav);

const viewportWidth = window.innerWidth;

let isOpen = false;
function toggleNav() {
  menu.classList.toggle("hide-nav");
  menu.ariaExpanded = "true";
  //   overlay.classList.toggle("show-overlay");
  isOpen = !isOpen;
  return (toggleNavImg.src = isOpen
    ? "./images/icon-close.svg"
    : "./images/icon-hamburger.svg");
}

function getCardData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      getCardsHtml(data);
    });
}

function getCardsHtml(arr) {
  let cardsHtml = "";

  arr.forEach((card) => {
    let image = viewportWidth > 875 ? card.images.desktop : card.images.mobile;
    cardsHtml += `
    <div class="card" style="background-image: url('${image}');" id=${card.imageSlug}>
        <h3 class="card--title" >${card.title}</h3>
    </div>    
    `;
  });
  cardsContainer.innerHTML = cardsHtml;
}
getCardData();

cardsContainer.addEventListener("click", (e) => {
  if (e.target.id) {
    fullscreenDiv.setAttribute("data-fullscreen", "true");
    fullscreenDiv.style.backgroundImage = `url("./images/desktop/${e.target.id}.jpg")`;
  }
});

fullscreenDiv.addEventListener("click", () => {
  fullscreenDiv.setAttribute("data-fullscreen", "false");
});
