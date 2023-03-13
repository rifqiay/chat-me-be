require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mainRoutes = require("./src/routes/index.routes");
const port = process.env.PORT || 3001;

const server = require("http").createServer(app);
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRoutes);

const io = socketio(server, {
  cors: {
    origin: "*",
    // origin: ["http://localhost:3000", "https://fe-telegram-inky.vercel.app"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send-message", (msg) => {
    io.emit("send-message", msg);
  });
});

app.use((err, req, res, next) => {
  const message = err.message || "internal server error";
  const statusCode = err.status || 500;
  res.status(statusCode).send({
    message,
    statusCode,
  });
});

server.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
