import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../model/user.js";

export const SIGN_IN = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const user = new UserModel(newUser);

    const response = await user.save();
    console.log(response);

    return res
      .status(201)
      .json({ message: "User was created", user: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "We have some problems" });
  }
};

export const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isPasswordsMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordsMatch) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "successfull login", token: token });
  } catch (err) {
    console.log(err);
    return res(500).json({ message: "We have some problems" });
  }
};
