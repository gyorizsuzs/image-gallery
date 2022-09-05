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
