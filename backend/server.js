require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://FehMatos.github.io/Workout-Buddy",
    ],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        ` ✅ Connected to DB & listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
