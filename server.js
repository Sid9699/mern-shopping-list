import express from "express";
import mongoose from "mongoose";
import config from "config";
import items from "./routes/api/items.js";
import users from "./routes/api/users.js";
import auth from "./routes/api/auth.js";
import cors from "cors";
import path from "path";

const app = express();

//Body Parser
app.use(express.json());
app.use(cors());

//Connect to db

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server up on port: ${port}`));
