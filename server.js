var express = require("express");
var bodyParser = require("body-parser");
var path = require("path")
// Requiring our models for syncing
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// listen on port 3000
var PORT = process.env.PORT || 3000;

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function(){
  app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
  });
}
)