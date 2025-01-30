import type React from "react"
import { useState, useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

interface ChatProps {
  initialMessage?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  primaryColor?: string
  shape?: "round" | "oval"
  logo?: string
  labelPosition?: "top" | "bottom" | "left" | "right"
}

const Chat: React.FC<ChatProps> = ({
  initialMessage = "Hello! How can I help you today?",
  position = "bottom-right",
  primaryColor = "#007bff",
  shape = "oval",
  logo,
  labelPosition = "left",
}) => {
  const [messages, setMessages] = useState<Message[]>([{ id: 1, text: initialMessage, sender: "bot" }])
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text, sender }])
  }

  const handleUserMessage = async (text: string) => {
    addMessage(text, "user")
    // Simulate API call
    setTimeout(() => {
      addMessage(`You said: ${text}`, "bot")
    }, 1000)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messagesEndRef]) //Corrected dependency

  useEffect(() => {
    // Call adjustWidgetPosition when the chat window opens or closes
    if (typeof window !== "undefined" && window.adjustWidgetPosition) {
      window.adjustWidgetPosition()
    }
  }, [isOpen])

  const shapeClass = `chat-widget--${shape}`
  const labelClass = `chat-widget__label chat-widget__label--${labelPosition}`

  return (
    <div
      className={`chat-widget ${shapeClass} chat-widget--${position}`}
      style={{ "--primary-color": primaryColor } as React.CSSProperties}
    >
      <div className="chat-widget__toggle-container">
        <button className="chat-widget__toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className="chat-widget__logo-container">
            <img src={logo || "/placeholder-logo.svg"} alt="Chat" className="chat-widget__logo" />
          </div>
        </button>
        <span className={labelClass}>Chat with Us</span>
      </div>
      {isOpen && (
        <div className="chat-widget__container">
          <div className="chat-widget__header">
            <div className="chat-widget__header-content">
              <div className="chat-widget__logo-container chat-widget__logo-container--small">
                <img src={logo || "/placeholder-logo.svg"} alt="Chat" className="chat-widget__logo" />
              </div>
              <h3>Chat with us</h3>
            </div>
            <button className="chat-widget__close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-widget__messages">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleUserMessage} />
        </div>
      )}
    </div>
  )
}

export default Chat

