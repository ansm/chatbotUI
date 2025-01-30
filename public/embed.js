;(() => {
  // Parse the script tag attributes
  var currentScript = document.currentScript
  var initialMessage = currentScript.getAttribute("data-initial-message") || "Hello! How can I help you today?"
  var position = currentScript.getAttribute("data-position") || "bottom-right"
  var primaryColor = currentScript.getAttribute("data-primary-color") || "#007bff"
  var shape = currentScript.getAttribute("data-shape") || "oval"
  var logo = currentScript.getAttribute("data-logo") || ""
  var labelPosition = currentScript.getAttribute("data-label-position") || "left"

  // Validate shape
  if (shape !== "round" && shape !== "oval") {
    console.warn("Invalid shape. Defaulting to oval.")
    shape = "oval"
  }

  // Validate label position
  if (!["top", "bottom", "left", "right"].includes(labelPosition)) {
    console.warn("Invalid label position. Defaulting to left.")
    labelPosition = "left"
  }

  // Create a div to hold our chat widget
  var chatWidgetContainer = document.createElement("div")
  chatWidgetContainer.id = "root"
  document.body.appendChild(chatWidgetContainer)

  // Get the current script path
  var scriptPath = currentScript.src
  var basePath = scriptPath.substring(0, scriptPath.lastIndexOf("/"))

  // Function to load CSS
  function loadCSS(filename) {
    var link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = filename
    document.head.appendChild(link)
  }

  // Function to load JavaScript
  function loadScript(filename) {
    var script = document.createElement("script")
    script.src = filename
    script.async = true
    document.body.appendChild(script)
  }

  // Load asset information
  var assetInfoScript = document.createElement("script")
  assetInfoScript.src = basePath + "/asset-info.js"
  assetInfoScript.onload = () => {
    if (window.chatbotAssetInfo) {
      loadCSS(basePath + "/" + window.chatbotAssetInfo.css)
      loadScript(basePath + "/" + window.chatbotAssetInfo.js)
      console.log("Chatbot widget assets loaded")

      // Initialize the chatbot with the parsed attributes
      window.initChatbot = () => {
        window.renderChatbot(chatWidgetContainer, {
          initialMessage: initialMessage,
          position: position,
          primaryColor: primaryColor,
          shape: shape,
          logo: logo,
          labelPosition: labelPosition,
        })
        // Wait for the widget to be rendered before adjusting its position
        setTimeout(adjustWidgetPosition, 100)
      }

      // Call initChatbot when the main script is loaded
      if (window.renderChatbot) {
        window.initChatbot()
      } else {
        window.addEventListener("chatbotLoaded", window.initChatbot)
      }
    } else {
      console.error("Chatbot asset information not found")
    }
  }
  assetInfoScript.onerror = () => {
    console.error("Failed to load chatbot asset information")
  }
  document.body.appendChild(assetInfoScript)

  function adjustWidgetPosition() {
    var widget = document.querySelector(".chat-widget")
    var toggleContainer = document.querySelector(".chat-widget__toggle-container")
    var chatContainer = document.querySelector(".chat-widget__container")
    var label = document.querySelector(".chat-widget__label")

    if (!widget || !toggleContainer || !label) return

    var viewportWidth = window.innerWidth
    var viewportHeight = window.innerHeight
    var toggleRect = toggleContainer.getBoundingClientRect()
    var labelRect = label.getBoundingClientRect()

    var padding = 20 // Padding from edges
    var widgetWidth = toggleRect.width + labelRect.width
    var widgetHeight = Math.max(toggleRect.height, labelRect.height)

    // Adjust widget position
    var widgetLeft, widgetTop

    if (position.includes("right")) {
      widgetLeft = viewportWidth - widgetWidth - padding
    } else {
      widgetLeft = padding
    }

    if (position.includes("bottom")) {
      widgetTop = viewportHeight - widgetHeight - padding
    } else {
      widgetTop = padding
    }

    widget.style.left = widgetLeft + "px"
    widget.style.top = widgetTop + "px"

    // Adjust chat container position
    if (chatContainer) {
      chatContainer.style.maxHeight = viewportHeight - widgetHeight - padding * 2 + "px"
    }
  }

  window.adjustWidgetPosition = adjustWidgetPosition

  // Call adjustWidgetPosition after the widget is rendered and on window resize
  window.addEventListener("resize", adjustWidgetPosition)

  // Modify the initChatbot function to call adjustWidgetPosition
  window.initChatbot = () => {
    window.renderChatbot(chatWidgetContainer, {
      initialMessage: initialMessage,
      position: position,
      primaryColor: primaryColor,
      shape: shape,
      logo: logo,
      labelPosition: labelPosition,
    })
    // Wait for the widget to be rendered before adjusting its position
    setTimeout(window.adjustWidgetPosition, 100)
  }
})()

