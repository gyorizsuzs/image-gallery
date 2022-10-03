import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiper = new Swiper(".swiper", {
  direction: "vertical",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperComponent = function () {
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Image 1</div>
      <div class="swiper-slide">Image 2</div>
      <div class="swiper-slide">Image 3</div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-scrollbar"></div>
  </div>;
};

const imageComponent = ({ id, title, uploadDate, photographersName }) => {
  const url = `http://127.0.0.1:3000/images/${id}`;
  return `
        <div>
            <h1>${title}</h1>
            <img src="${url}">
            <div>${uploadDate}</div>
            <div>${photographersName}</div>
        </div>
            `;
};

const getImages = async () => {
  const response = await fetch("/images");
  const images = await response.json();
  return images;
};

const formComponent = function ({ id, title, uploadDate, photographersName }) {
  return `
  <div id='main'>
    <form class="image-upload">
      <div class="input-container">
        <input class="id" type="text" placeholder="ID">
        <input class="title" type="text" placeholder="image name">
        <input class="uploadDate" type="text" placeholder="date of upload">
        <input class="photographer" type="text" placeholder="name of photographer">
        <input class="image-uploader" type="file" placeholder="Upload image" required>
        <div class="button-container">
          <button id="image-upload-button">Send</button>
        </div>
      </div>
    </form>
    </div>`;
};

console.log(await getImages());

const showImages = (images) => {
  const root = document.querySelector("#root");
  images.forEach((image) =>
    root.insertAdjacentHTML("beforeend", imageComponent(image))
  );
};

const init = async () => {
  showImages(await getImages());
};

await init();
