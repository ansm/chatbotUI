import type React from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`chat-message chat-message--${message.sender}`}>
      <div className="chat-message__content">{message.text}</div>
    </div>
  )
}

export default ChatMessage

