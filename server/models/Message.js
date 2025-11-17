import mongoose from 'mongoose'; // Use import instead of require

const MessageSchema = new mongoose.Schema({
  // Your schema fields here (e.g., toUserId, fromUserId, content, etc.)
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Could be false if it's a broadcast
  },
  content: {
    type: String,
    required: true,
  },
  isBroadcast: {
    type: Boolean,
    default: false,
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

export default Message; // ✅ Changed from module.exports