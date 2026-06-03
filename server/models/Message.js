import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      index: true
    },
    message: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: null
    },
    imageFileName: {
      type: String,
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
