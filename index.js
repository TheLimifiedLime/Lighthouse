const express = require("express");
const app = express();
const port = 3000;

app.use(
  express.static(`public`, {
    extensions: ["html"],
  })
);

app.get("/", (req, res) => {
  res.sendFile(`/public/index.html`, {
    root: __dirname,
  });
});

app.use(function (req, res, next) {
  res.status(404).sendFile(`/public/404.html`, { root: __dirname });
});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});
