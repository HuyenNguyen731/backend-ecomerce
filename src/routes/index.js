const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");

const routes = (app) => {
  //ánh xạ các route từ UserRouter tới endpoint /api/user
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use('/api/payment', PaymentRouter)
};

module.exports = routes;
