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
    members: {
      type: [String],
      required: [true, 'Group must have at least 1 member'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Group', groupSchema);
