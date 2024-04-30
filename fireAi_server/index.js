const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const routesAuth = require("./routes/auth.js");
const routesSignup = require("./routes/signup.js");
const routesTask = require("./routes/todo");

const cors = require("cors");
app.use(cors(""));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", routesAuth);
app.use("/signup", routesSignup);
app.use("/todo", routesTask);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
