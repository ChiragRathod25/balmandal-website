import { app } from "./app.js";
import ConnectDB from "./DB/index.js";
import "dotenv/config.js";
import { createServer } from "http";
import { Server } from "socket.io";
import {logger} from "./utils/logger.js";

import webpush from "web-push";
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket"],
  },
});
io.on("connection", (socket) => {
  logger.log("User is connected", socket.id);
  socket.emit("hello", "world");
  socket.emit("ping", "world");
  socket.emit("new", "");
  socket.on("disconnect", () => {
    logger.log("User is disconnected");
  });
  socket.on("notify", (payload) => {
    io.emit("notify", payload);
  });
});
io.on("connect_error", (err) => {
  logger.log("Connection Error:", err.message);
});

ConnectDB()
  .then(() => {
    try {
      httpServer.listen(process.env.PORT, "0.0.0.0", () => {
        logger.log("Server is listening", process.env.PORT);
      });
    } catch (error) {
      logger.log(`Error while starting the server : `, error);
    }
  })
  .catch((err) => {
    logger.error(`MongoDB connection failed !! \n Error: ${err}`);
  });
