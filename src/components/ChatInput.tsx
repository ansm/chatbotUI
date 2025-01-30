import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button type="submit" aria-label="Send message">
        <Send size={20} />
      </button>
    </form>
  )
}

export default ChatInput

