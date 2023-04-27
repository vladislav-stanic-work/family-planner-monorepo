import mongoose from 'mongoose';

const groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: {
      type: String,
    },
    adminId: {
      type: String,
      required: [true, 'Group must have an admin'],
    },
    memberIds: {
      type: [String],
      required: [true, 'Group must have at least 1 member'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Group', groupSchema);
