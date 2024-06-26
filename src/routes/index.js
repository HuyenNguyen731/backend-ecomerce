const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const RoleRouter = require("./RoleRouter");
const CategoryRouter = require("./CategoryRouter");
const ReviewRouter = require("./ReviewRouter");
const FeedbackRouter = require("./FeedbackRouter");
const BannerRouter = require("./BannerRouter");

const routes = (app) => {
  //ánh xạ các route từ UserRouter tới endpoint /api/user
  app.use("/api/role", RoleRouter);
  app.use("/api/category", CategoryRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/review", ReviewRouter);
  app.use("/api/feedback", FeedbackRouter);
  app.use("/api/banner", BannerRouter);
};

module.exports = routes;
