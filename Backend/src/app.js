import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

app.get('/',(req,res)=>{
  console.log('hi')
  res.
  status(200)
  .json({ message: "Hello from the server!" });
})
app.get("/api", (req, res) => {
  res.
  status(200)
  .json({ message: "Hello from the server!" });

});


import userRoutes from "./routes/user.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import talentRoutes from "./routes/talent.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import eventRoutes from "./routes/event.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/achievement", achievementRoutes);
app.use("/api/v1/talent", talentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/event", eventRoutes);

app.use(errorHandler)

export { app };
