import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "bad auth" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bad auth" });
    }

    req.body.userEmail = decoded.email;
    req.body.userId = decoded.id;

    next();
  });
};

export default authUser;
