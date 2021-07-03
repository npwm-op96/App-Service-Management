const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Profile = db.profile;

const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  var id = Math.floor(Date.now() / 1000)
  Profile.create({
    id_profile: id
  })
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    id_profile:id
  })
    .then(user => {
          res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
        console.log(user)
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id_user: user.id_user }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      Role.findOne({
        where: {
            id_role: user.id_role
          }
      }).then(roles => {
          authorities.push("ROLE_" + roles.name.toUpperCase());

          res.status(200).send({
          id_user: user.id_user,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
          
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};