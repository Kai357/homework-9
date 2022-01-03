const html_routes = require("./routes/html_routes");
const data_routes = require("./routes/data");
const express = require("express");

const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(data_routes);
app.use(html_routes);
app.listen(port, () => {
  console.log("listening on port: " + port);
});
