import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./styles.css"

interface ChatbotProps {
  initialMessage?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  primaryColor?: string
  shape?: "round" | "oval"
  logo?: string
  labelPosition?: "top" | "bottom" | "left" | "right"
}

function renderChatbot(container: HTMLElement, props: ChatbotProps) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>,
  )
}

// Expose the renderChatbot function to the global scope
window.renderChatbot = renderChatbot

// Dispatch an event when the chatbot is ready to be initialized
window.dispatchEvent(new Event("chatbotLoaded"))

