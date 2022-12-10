const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "template"));
app.set("view engine", "hbs");
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname + "../../index.html"));
});

require("./controllers/index")(app);

app.listen(8080);