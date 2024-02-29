const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");

const routes = (app) => {
  //ánh xạ các route từ UserRouter tới endpoint /api/user
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
};

module.exports = routes;
