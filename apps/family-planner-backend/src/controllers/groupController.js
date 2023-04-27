import asyncHandler from 'express-async-handler';

import { responseWrapper } from '../middleware/errorMiddleware';
import Group from '../models/groupModel';
import User from '../models/userModel';
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
        id: it._id,
        name: it.name,
        adminId: it.adminId,
        memberIds: it.memberIds,
      }))
    );
  } catch (error) {
    responseWrapper(res, 400, EEROR_CODES.GENERAL_ERROR);
    throw new Error('Something went wrong.');
  }
});

// @route POST /api/groups
const createGroup = asyncHandler(async (req, res) => {
  const { name, adminId, description, memberIds } = req.body;

  if (!name || !adminId || !memberIds?.length) {
    responseWrapper(res, 400, EEROR_CODES.USER_ADD_ALL_FIELDS);
    throw new Error('Please add all fields');
  }

  // Create user
  const newGroup = await Group.create({
    name,
    description,
    adminId,
    memberIds,
  });

  if (newGroup) {
    responseWrapper(res, 201, null, {
      id: newGroup._id,
      name: newGroup.name,
      description: newGroup.description,
      admin: newGroup.admin,
      memberIds: newGroup.memberIds,
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

// @route GET /api/groups/id
const getGroup = asyncHandler(async (req, res) => {
  const { _id, name, adminId, memberIds, description } = await Group.findById(
    req.params.id
  );

  // Get Admin data
  const { name: adminName } = await User.findById(adminId);
  // Add Admin to members
  const members = [
    {
      id: adminId,
      name: adminName,
    },
  ];

  // Add other members
  for (const memberId of memberIds.filter((it) => it !== adminId)) {
    const user = await User.findById(memberId).select('_id name');
    members.push({ id: user._id, name: user.name });
  }

  responseWrapper(res, 200, null, {
    id: _id,
    name,
    admin: {
      id: adminId,
      name: adminName,
    },
    members,
    description,
  });
});

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

export { createGroup, getGroup, getGroups };
