const JWT = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
  try {
    // console.log(req.headers);
    const longToken = req.headers.authorization;
    if (!longToken) {
      return res.status(401).json({
        message: "token not present",
      });
    }
    const token = longToken.split(" ")[1];
    let user = JWT.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "invalid token ",
    });
  }
};

const isUserAdmin = (req, res, next) => {
  try {
    // console.log(req.headers);
    const longToken = req.headers.authorization;
    if (!longToken) {
      return res.status(401).json({
        message: "token not present",
      });
    }
    const token = longToken.split(" ")[1];
    let user = JWT.verify(token, process.env.JWT_SECRET);
    if (user.isAdmin) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({
        message: "forbidden, only admin can do this operation",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "invalid token ",
    });
  }
  // try {
  //   // console.log(req.headers);
  //   const admin = req.body.user.isAdmin;
  //   if (!admin) {
  //     return res.status(403).json({
  //       message: "only admin can perform this action",
  //     });
  //   }
  //   // const token = longToken.split(" ")[1];
  //   // let user = JWT.verify(token, process.env.JWT_SECRET);
  //   // req.user = user;
  //   next();
  // } catch (err) {
  //   console.log(err);
  //   return res.status(401).json({
  //     message: "invalid token ",
  //   });
  // }
};

module.exports = { isTokenValid, isUserAdmin };
