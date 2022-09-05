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
