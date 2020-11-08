//import different route modules

const constructorMethod = (app) => {
  app.use("//*changes this here */" /*changes this here */);
  app.use("//*changes this here */" /*changes this here */);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
