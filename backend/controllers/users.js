const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const validator = require('validator');
const { HTTP_STATUS_CREATED } = require('http2').constants;
const { getJwtToken } = require('../utils/jwt');
const UserModel = require('../models/user');
const NotFoundError = require('../utils/errors/not-found');
const BadRequestError = require('../utils/errors/bad-request');
const ConflictError = require('../utils/errors/conflict');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError());
      if (err instanceof mongoose.Error.ValidationError) {
        // console.log('this is an whole error body ===> ', err);
        // console.log('this is an error object ===>', err.errors);
        const errMessage = Object.values(err.errors).map((item) => item.message).join(', ');
        // console.log('this is a final string ===>', errMessage);
        return next(new BadRequestError(errMessage));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);
      return res.send({ token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const findById = (id) => UserModel.findById(id);

// let findById = (id) => UserModel.findById(id);

// function findByIdcachingDecorator(func) {
//   let cache = new Map();

//   return function (x) {
//     if (cache.has(x)) {
//       console.log('cache has x');
//       console.log(x);
//       console.log(cache.get(x));
//       return cache.get(x);
//     }

//     let result = func(x);
//     console.log('cache has no x');
//     console.log(x);
//     console.log(result);

//     cache.set(x, result);
//     return result;
//   };
// }

// findById = findByIdcachingDecorator(findById);

module.exports.getCurrentUser = (req, res, next) => {
  findById(req.user._id)
  // UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new NotFoundError('User is not found'));
      return res.send(user);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  findById(req.params.userId)
  // const { userId } = req.params;
  // return UserModel.findById(userId)
    .then((user) => {
      if (!user) return next(new NotFoundError('User is not found'));
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError());
      return next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError());
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError());
      return next(err);
    });
};
