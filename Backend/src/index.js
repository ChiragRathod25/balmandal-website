import { app } from "./app.js";
import ConnectDB from "./DB/index.js";
import "dotenv/config.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
export const io=new Server(httpServer,{
  cors:{
    origin:'*',
    methods: ['GET', 'POST'],
    transports: ['websocket'],
  }
})
io.on('connection', (socket) => {
  console.log("A user is connnected");
  console.log("Socket", socket.id);

  socket.emit("hello", "world");
  socket.emit("ping", "world");
  socket.emit('new',"")
  socket.on("disconnect", () => {
    console.log("User is disconnected"); 
  });
});
io.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
});


ConnectDB()
  .then(() => {
    try {
      httpServer.listen(process.env.PORT, '0.0.0.0',() => {
        console.log("Server is listening",process.env.PORT);
      });

    } catch (error) {
      console.log(`Error while starting the server : `, error);
    }
  })
  .then((server) => {})
  .catch((err) => {
    console.error(`MongoDB connection failed !! \n Error: ${err}`);
  });
