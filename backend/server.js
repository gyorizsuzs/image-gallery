const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "../frontend/")));

/* app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../frontend/index.html"));
}); */ //noidea 1.0

app.get("/images", (req, res) => {
  res.sendFile(path.join(__dirname, "images/images.json"));
});

app.get("/images/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.sendFile(path.join(__dirname, getPathById(id)));
});

app.post("/uploadimage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("no file was uploaded");
  }

  const file = req.files.imageFile;
  const fileName = req.body.imageName;

  file.mv(`${__dirname}/./images/${fileName}.jpg`, (error) => {
    if (error) {
      return res.status(500).send(error);
    }

    try {
      let images = fs.readFileSync(`${__dirname}/./images.json`);
      imageData = JSON.parse(images);
      imageData.push({ image: `/backend/images/${fileName}.jpg` });
      fs.writeFileSync(
        `${__dirname}/./images/images.json`,
        JSON.stringify(imageData)
      );
      res.status(200).send("nice");
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  });
});

const getPathById = (id) => {
  const images = JSON.parse(fs.readFileSync("./images/images.json"));
  const image = images.find((image) => image.id == id);
  return `./images/${image.url}`;
};

/* const fullPath = path.join(__dirname, "../frontend/index.html");
console.log(fullPath);
console.log(__dirname); */ //noidea 2.0

const port = 3000;
app.listen(port, () => {
  console.log(`Server is on localhost:${port}`);
});
