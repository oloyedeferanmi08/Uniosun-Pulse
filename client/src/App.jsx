import { useState } from 'react'
import MessageForm from './components/MessageForm'
import './styles/App.css'

function App() {
  const [username, setUsername] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  const handleCreateProfile = (newUsername) => {
    setUsername(newUsername)
    setIsCreated(true)
  }

  return (
    <div className="app">
      {!isCreated ? (
        <div className="welcome-screen">
          <h1>Welcome to Uniosun Pulse</h1>
          <p>Create your anonymous message link</p>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
          />
          <button 
            onClick={() => handleCreateProfile(username)}
            disabled={!username.trim()}
            className="create-btn"
          >
            Create Link
          </button>
        </div>
      ) : (
        <MessageForm username={username} />
      )}
    </div>
  )
}

export default App
