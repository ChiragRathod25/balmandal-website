import { app } from "./app.js";
import ConnectDB from "./DB/index.js";
import "dotenv/config";

ConnectDB()
  .then(() => {
    try {
      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port: ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(`Error while starting the server : `, error);
    }
  })
  .catch((err) => {
    console.error(`MongoDB connection failed !! \n Error: ${err}`);
  });
