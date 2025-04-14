const path = require("path");

module.exports = {
  appDirectory: path.resolve(__dirname, "src/app"),
  serverBuildDirectory: "build",
  assetsBuildDirectory: "build/client",
  publicPath: "/",
};
