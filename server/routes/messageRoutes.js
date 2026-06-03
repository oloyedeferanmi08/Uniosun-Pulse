import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Message from '../models/Message.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Send a message
router.post('/send', upload.single('image'), async (req, res) => {
  try {
    const { message, recipient } = req.body

    if (!message || !recipient) {
      return res.status(400).json({ message: 'Message and recipient are required' })
    }

    const newMessage = new Message({
      recipient,
      message,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      imageFileName: req.file ? req.file.originalname : null
    })

    await newMessage.save()

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    })
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ message: 'Failed to send message', error: error.message })
  }
})

// Get messages for a recipient
router.get('/:recipient', async (req, res) => {
  try {
    const { recipient } = req.params

    const messages = await Message.find({ recipient }).sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message })
  }
})

// Mark message as read
router.patch('/:messageId/read', async (req, res) => {
  try {
    const { messageId } = req.params

    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    )

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.status(200).json({
      message: 'Message marked as read',
      data: message
    })
  } catch (error) {
    console.error('Error updating message:', error)
    res.status(500).json({ message: 'Failed to update message', error: error.message })
  }
})

export default router
