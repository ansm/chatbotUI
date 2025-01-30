interface Window {
  adjustWidgetPosition: () => void
  renderChatbot: (container: HTMLElement, options: any) => void
  chatbotAssetInfo: {
    css: string
    js: string
  }
  initChatbot: () => void
}

