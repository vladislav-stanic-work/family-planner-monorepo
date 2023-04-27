import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { responseWrapper } from '../middleware/errorMiddleware';
import Group from '../models/groupModel';
import User from '../models/userModel';
import { EEROR_CODES } from './../utils/index';

// @route GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const result = await User.find();

    responseWrapper(
      res,
      200,
      null,
      result.map((it) => ({
        id: it._id,
        name: it.name,
        email: it.email,
        role: it.role,
      }))
    );
  } catch (error) {
    responseWrapper(res, 400, EEROR_CODES.GENERAL_ERROR);
    throw new Error('Something went wrong.');
  }
});

// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    responseWrapper(res, 400, EEROR_CODES.USER_ADD_ALL_FIELDS);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    responseWrapper(res, 400, EEROR_CODES.USER_EXISTS);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    responseWrapper(res, 201, null, {
      name: user.name,
      email: user.email,
    });
    // _id: user.id,
    // token: generateToken(user._id),
  } else {
    responseWrapper(res, 400, EEROR_CODES.USER_INVALID_DATA);
    throw new Error('Invalid user data');
  }
});

// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    responseWrapper(res, 201, null, {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    responseWrapper(res, 400, EEROR_CODES.USER_INVALID_CREDENTIALS);
    throw new Error('Invalid credentials');
  }
});

// // @route GET /api/users/me
// const getMe = asyncHandler(async (req, res) => {
//   const { _id, name, email } = await User.findById(req.user.id);

//   responseWrapper(res, 200, null, {
//     id: _id,
//     name,
//     email,
//   });
// });

// @route GET /api/users/id
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  returnUser(res, user);
});

// @route PATCH /api/users
const updateUser = asyncHandler(async (req, res) => {
  const userObjUpdate = { ...req.body };
  delete userObjUpdate.removedGroupIds;
  delete userObjUpdate.addedGroupIds;

  // Update user
  const user = await User.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    userObjUpdate,
    { new: true }
  );

  // Add
  if (req.body.addedGroupIds?.length) {
    for (const added of req.body.addedGroupIds) {
      await Group.findByIdAndUpdate(
        added,
        { $push: { memberIds: req.params.id } },
        { new: true, upsert: true }
      );
    }
  }

  // Remove
  if (req.body.removedGroupIds?.length) {
    for (const removed of req.body.removedGroupIds) {
      await Group.findByIdAndUpdate(removed, {
        $pullAll: { memberIds: [req.params.id] },
      });
    }
  }

  returnUser(res, user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const returnUser = async (res, { email, description, _id, name }) => {
  const groups = await Group.find({ memberIds: { $in: [_id] } }).select(
    '_id name'
  );

  responseWrapper(res, 200, null, {
    id: _id,
    name,
    email,
    description,
    groups: groups.map((it) => ({
      id: it._id,
      name: it.name,
    })),
  });
};

export { getUser, getUsers, loginUser, registerUser, updateUser };
