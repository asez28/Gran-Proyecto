const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const sendRoutes = require("./routes/sendRoutes");
const path = require('path');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/FinalDataBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", sendRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
