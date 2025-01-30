import type React from "react"
import Chat from "./components/Chat"

interface AppProps {
  initialMessage?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  primaryColor?: string
  shape?: "round" | "oval"
  logo?: string
  labelPosition?: "top" | "bottom" | "left" | "right"
}

const App: React.FC<AppProps> = ({ initialMessage, position, primaryColor, shape, logo, labelPosition }) => {
  return (
    <div className="chat-widget-app">
      <Chat
        initialMessage={initialMessage}
        position={position}
        primaryColor={primaryColor}
        shape={shape}
        logo={logo}
        labelPosition={labelPosition}
      />
    </div>
  )
}

export default App

