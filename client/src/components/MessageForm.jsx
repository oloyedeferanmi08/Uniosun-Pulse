import { useState } from 'react'
import axios from 'axios'
import '../styles/MessageForm.css'

function MessageForm({ username }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('No file chosen')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      setError('Please enter a message')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('message', message)
      formData.append('recipient', username)
      if (file) {
        formData.append('image', file)
      }

      await axios.post('/api/messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setSuccess(true)
      setMessage('')
      setFile(null)
      setFileName('No file chosen')
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const shareLink = `${window.location.origin}?user=${username}`

  return (
    <div className="message-container">
      <div className="message-card">
        <h1 className="username">@{username}</h1>
        <p className="subtitle">Send me anonymous messages!</p>

        {success && (
          <div className="success-message">
            ✓ Message sent successfully!
          </div>
        )}

        {error && (
          <div className="error-message">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="message-textarea"
            rows="6"
          />

          <div className="file-upload">
            <label htmlFor="file-input" className="file-label">
              Attach an image (optional, max 5MB):
            </label>
            <div className="file-input-wrapper">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <span className="file-name">{fileName}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="send-btn"
          >
            {loading ? 'Sending...' : 'Send Anonymously'}
          </button>
        </form>

        <div className="share-section">
          <p className="share-label">Share your link:</p>
          <div className="share-link">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="link-input"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        </div>

        <footer className="footer">
          <a href="#">Terms</a>
          <span> | </span>
          <a href="#">Privacy</a>
        </footer>
      </div>
    </div>
  )
}

export default MessageForm
