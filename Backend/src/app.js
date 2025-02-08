import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

app.get("/api", (req, res) => {
  res.
  status(200)
  .json({ message: "Hello from the server!" });

});


import balakRoutes from "./routes/balak.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import talentRoutes from "./routes/talent.routes.js";

app.use("/api/v1/balak", balakRoutes);
app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/achievement", achievementRoutes);
app.use("/api/v1/talent", talentRoutes);

export { app };
