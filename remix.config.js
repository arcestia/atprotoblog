/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  tailwind: true,
  appDirectory: "src/app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true
  },
}
