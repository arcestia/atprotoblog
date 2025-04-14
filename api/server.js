// api/server.js
import * as path from "path";
import { createRequestHandler } from "@remix-run/node";
import { fileURLToPath } from "url";

// Ensure we're using ESM compatible paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.join(__dirname, "../build");

// Create a handler function that will be used by Vercel
const handler = async (request, event) => {
  // Import the build dynamically
  const build = await import(BUILD_DIR);
  
  // Create a request handler with the build
  return createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
  })(request, event);
};

export default handler;
