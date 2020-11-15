//import different route modules
const main_file = require("./main");
const home_file = require("./home");

const constructorMethod = (app) => {
  app.use("/", main_file);
  app.use("/home", home_file);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;