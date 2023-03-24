const express = require("express");
const Connect = require("./src/config/db");
require("dotenv").config();
const registerRouter = require("./src/routes/userRouter");
const loginRouter = require("./src/routes/userRouter");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend build files
app.use(express.static(path.join(__dirname, "frontend/build")));

// Routes
app.use("/user", registerRouter);
app.use("/user", loginRouter);
app.get("/", authMiddleware, (req, res) =>
  res.status(200).json({ message: "Hello" })
);

// Catch-all route to serve the index.html file
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, async () => {
  try {
    await Connect();
    console.log(`Server running on localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
