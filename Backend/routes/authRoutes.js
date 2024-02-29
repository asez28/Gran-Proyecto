const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createAccessToken } = require("../libs/jwt.js");
const authRequired = require("../middlewares/validateToken.js");
const validateSchema = require("../middlewares/validatorMiddlewares.js");
const { registerSchema, loginSchema } = require("../schemas/authSchemas.js");

const router = express.Router();

router.post("/register", validateSchema(registerSchema), async (req, res) => {
  try {
    const {
      username,
      name,
      lastName,
      password,
      email,
      address,
      phoneNumber,
      city,
      imageProfile,
    } = req.body;

    if (
      !username ||
      !name ||
      !lastName ||
      !password ||
      !email ||
      !address ||
      !city ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json(["El Usuario ya existe"]);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      email,
      username,
      name,
      lastName,
      password: hashedPassword,
      address,
      city,
      phoneNumber,
      imageProfile,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      name: userSaved.name,
      lastName: userSaved.lastName,
      email: userSaved.email,
      address: userSaved.address,
      city: userSaved.city,
      phoneNumber: userSaved.phoneNumber,
      imageProfile: userSaved.imageProfile,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/login", validateSchema(loginSchema), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Nombre de usuario, email o password incorrectos" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ message: "Nombre de usuario, email o password incorrectos" });
    }

    const token = await createAccessToken({ id: user._id });

    res.status(200).json({ message: "Inicio de sesion", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
});

router.get("/profile", authRequired, async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    name: userFound.name,
    lastName: userFound.lastName,
    email: userFound.email,
    address: userFound.address,
    city: userFound.city,
    phoneNumber: userFound.phoneNumber,
    imageProfile: userFound.imageProfile,
  });
  res.send("profile");
});

module.exports = router;
