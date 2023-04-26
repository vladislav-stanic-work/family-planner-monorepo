import asyncHandler from 'express-async-handler';

import { responseWrapper } from '../middleware/errorMiddleware';
import Group from '../models/groupModel';
import { EEROR_CODES } from '../utils/index';

// @route GET /api/groups
const getGroups = asyncHandler(async (req, res) => {
  try {
    const result = await Group.find();

    responseWrapper(
      res,
      200,
      null,
      result.map((it) => ({
        _id: it._id,
        name: it.name,
        members: it.members,
        // description: it.description,
      }))
    );
  } catch (error) {
    responseWrapper(res, 400, EEROR_CODES.GENERAL_ERROR);
    throw new Error('Something went wrong.');
  }
});

// @route POST /api/groups
const createGroup = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;

  if (!name || !members || !members.length) {
    responseWrapper(res, 400, EEROR_CODES.USER_ADD_ALL_FIELDS);
    throw new Error('Please add all fields');
  }

  // Create user
  const newGroup = await Group.create({
    name,
    description,
    members,
  });

  if (newGroup) {
    responseWrapper(res, 201, null, {
      id: newGroup._id,
      name: newGroup.name,
      description: newGroup.description,
      members: newGroup.members,
    });
  } else {
    responseWrapper(res, 400, EEROR_CODES.USER_INVALID_DATA);
    throw new Error('Invalid user data');
  }
});

// // @route POST /api/users/login
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Check for user email
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     responseWrapper(res, 201, null, {
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     responseWrapper(res, 400, EEROR_CODES.USER_INVALID_CREDENTIALS);
//     throw new Error('Invalid credentials');
//   }
// });

// // // @route GET /api/users/me
// // const getMe = asyncHandler(async (req, res) => {
// //   const { _id, name, email } = await User.findById(req.user.id);

// //   responseWrapper(res, 200, null, {
// //     id: _id,
// //     name,
// //     email,
// //   });
// // });

// // @route GET /api/users/id
// const getUser = asyncHandler(async (req, res) => {
//   const { _id, name, email, description } = await User.findById(req.params.id);

//   responseWrapper(res, 200, null, {
//     id: _id,
//     name,
//     email,
//     description,
//   });
// });

// // @route POST /api/users
// const updateUser = asyncHandler(async (req, res) => {
//   // Update user
//   const { _id, name, email, description } = await User.findByIdAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     req.body,
//     { new: true }
//   );

//   responseWrapper(res, 200, null, {
//     _id,
//     name,
//     email,
//     description,
//   });
// });

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

export { createGroup, getGroups };
