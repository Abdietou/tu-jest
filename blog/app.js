var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const Article = require("./models/article.model");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB OK !"))
  .catch(() => console.log("Connexion à MongoDB Echec !"));

/** example inster data */

for (let index = 0; index < 10; index++) {
  var article = new Article({
    name: "Qu'est-ce que le Lorem Ipsum " + index + " ?",
    content:
      "Le Lorem Ipsum apparaît régulièrement sur les sites web ou sur les templates de page internet. Si vous ne parlez pas latin, vous pensez certainement qu’il y a une signification derrière cette phrase. Et pourtant, il n’en est rien ! Il s’agit de lorem ipsum, autrement dit, un faux texte. Le lorem ipsum comprend plusieurs phrases et mots de longueurs variables. Ainsi, cela reproduit à l’identique un contenu réel, à la différence que celui-ci n’a aucun sens. Il est possible de créer un texte lorem ipsum à l’aide d'un générateur. Vous pouvez choisir le nombre de mots, de phrases ou encore de paragraphes.",
    publishedDate: Date.now(),
  });

  // article
  //   .save()
  //   .then(() => console.log("Sauvegarde OK"))
  //   .catch(() => console.log("Sauvegarde KO"));
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
