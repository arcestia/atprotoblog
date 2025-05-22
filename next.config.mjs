/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode is good for identifying potential problems in an application.
  reactStrictMode: true,
  // Add any other configurations you might need here in the future.
  // For Tailwind CSS, Next.js usually autodetects it if `tailwind.config.js` (or .ts) is present.
  // However, explicitly ensuring postcss plugins are configured if needed.
  // Next.js 13+ handles PostCSS plugins like TailwindCSS automatically with a `postcss.config.js`.
  // If specific paths for Tailwind CSS content are needed beyond the defaults,
  // they should be in `tailwind.config.ts`.
};

export default nextConfig;
