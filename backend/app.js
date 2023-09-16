import express from "express";
import multer from "multer"; // You need to import multer for file upload
import Posts from "./model/posts.js";

const app = express();

const postsData = new Posts();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
  }
};

var upload = multer({ storage: storage });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/uploads", express.static("uploads"));
app.get("/api/posts", (req, res) => {
  res.send(postsData.get());
});
app.get("/api/posts/:post_id", (req, res) => {
  const id = req.params.post_id;
  const foundPost = postsData.getIndividualBlog(id);
  if (foundPost) res.status(200).send(foundPost);
  else res.status(404).send("not found");
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  let str = req.file.path;
  var convertedPath = str.replace(/\\/g, "/");
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: convertedPath,
    added_date: `${Date.now()}`,
  };
  postsData.add(newPost);
  res.status(201).send(newPost);
});

app.listen(3000, () => console.log("Listening on http://localhost:3000/"));
