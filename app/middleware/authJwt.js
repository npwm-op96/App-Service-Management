const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
// const resp =require('../module/response.module.js')
const User = db.user;
// const Role = db.role;


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.id_user = decoded.id_user;
      next();
    });
  };
  isAdmin = (req, res, next) => {
    User.findByPk(req.id_user).then(user => {
        console.log(user)
        Role.findByPk(user.id_role).then(roles => {
          if (roles.name === "admin") {
            next();
            return;
          }
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
  
  isVisitor = (req, res, next) => {
    User.findByPk(req.id_user).then(user => {
        Role.findOne({
            where: {
                id_role: user.id_role
              }
          }).then(roles => {
          if (roles.name === "visitor") {
            next();
            return;
          }
        res.status(403).send({
          message: "Require visitor Role!"
        });
      });
    });
  };
  
//   isVisitorOrAdmin = (req, res, next) => {
//     User.findByPk(req.id_user).then(user => {
//     //   user.getRoles().then(roles => {
//     //     for (let i = 0; i < roles.length; i++) {
//     //       if (roles[i].name === "moderator") {
//     //         next();
//     //         return;
//     //       }
  
//     //       if (roles[i].name === "admin") {
//     //         next();
//     //         return;
//     //       }
//     //     }
  
//     //     res.status(403).send({
//     //       message: "Require Moderator or Admin Role!"
//     //     });
//     //   });
//     });
//   };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isVisitor: isVisitor,
    // isVisitorOrAdmin: isVisitorOrAdmin
  };
  module.exports = authJwt;
