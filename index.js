const express = require("express");
const app = express();
const port = 3000;

// https://webdva.github.io/how-to-force-express-https-tutorial/
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    // the statement for performing our redirection
    return res.redirect("https://" + req.headers.host + req.url);
  } else {
    return next();
  }
});

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
