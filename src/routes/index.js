const UserRouter = require("./UserRouter");

const routes = (app) => {
  //ánh xạ các route từ UserRouter tới endpoint /api/user
  app.use("/api/user", UserRouter);
};

module.exports = routes;
