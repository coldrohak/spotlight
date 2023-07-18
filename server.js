const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./netflix-ui/build")));
  console.log(__dirname1);
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname1, ".", "netflix-ui", "build", "index.html")
    )
  );
} else {
  // app.get("/", (req, res) => {
  //   res.send("API is running..");
  // });
}

// --------------------------deployment------------------------------

app.listen(5000, () => {
  console.log("server started on port 5000");
});
