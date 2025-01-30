const fs = require("fs")
const path = require("path")

const buildPath = path.join(__dirname, "build")
const assetManifestPath = path.join(buildPath, "asset-manifest.json")

fs.readFile(assetManifestPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading asset-manifest.json:", err)
    return
  }

  const manifest = JSON.parse(data)
  const cssFile = manifest.files["main.css"]
  const jsFile = manifest.files["main.js"]

  const assetInfo = `window.chatbotAssetInfo = { css: "${cssFile}", js: "${jsFile}" };`

  fs.writeFile(path.join(buildPath, "asset-info.js"), assetInfo, (err) => {
    if (err) {
      console.error("Error writing asset-info.js:", err)
    } else {
      console.log("asset-info.js generated successfully")
    }
  })
})

