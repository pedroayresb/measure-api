import express from "express";
import bodyParser from "body-parser";

import errorHandler from "./middlewares/errorHandler.middleware";

import customerRoutes from "./routes/customer.route";
import measureRoutes from "./routes/measure.route";

const server = express();

const accessControl: express.RequestHandler = (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,OPTIONS,PUT,PATCH",
  );
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

server.use(
  bodyParser.json({
    limit: "50mb",
  }),
);
server.use(accessControl);
server.use(express.json());

server.use(customerRoutes);
server.use(measureRoutes);

server.use(errorHandler);

export default server;
