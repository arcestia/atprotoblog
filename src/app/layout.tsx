import React from 'react';
import Link from 'next/link'; // Import Link for internal navigation
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

// It's generally recommended to import global CSS in the root layout in Next.js
import './tailwind.css';
import './styles/theme.css';
import './styles/home.css';
import './styles/blog.css';

// Default metadata for the entire application. Can be overridden by specific pages.
export const metadata = {
  title: {
    default: "Skiddle's Blog", // Default title for the site
    template: "%s | Skiddle's Blog", // Template for page-specific titles
  },
  description: 'Personal blog and writings by Skiddle, focusing on JavaScript, ATProtocol, and decentralized social media.',
  // Add other global metadata tags here if needed (e.g., openGraph defaults)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Font links from original root.tsx */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon links can be added here or using Next.js file conventions (e.g., app/favicon.ico) */}
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-color)]">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Topbar - visible on all screen sizes */}
            <Topbar />
            
            <main className="flex-1">
              {children} {/* This is where page content will be rendered */}
            </main>
            
            <footer className="py-8 bg-[var(--bg-secondary)]">
              <div className="container mx-auto px-4">
                <div className="text-center text-sm text-[var(--text-tertiary)]">
                  <div className="flex justify-center space-x-4 mb-4">
                    <a href="mailto:hello@skiddle.id" className="hover:text-[var(--accent-blue)] transition-colors">Email</a>
                    <span>•</span>
                    <a href="https://github.com/arcestia" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-blue)] transition-colors">GitHub</a>
                    <span>•</span>
                    <a href="https://bsky.app/profile/skiddle.id" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-blue)] transition-colors">Bluesky</a>
                    <span>•</span>
                    <a href="https://github.com/sponsors/arcestia" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-blue)] transition-colors">Donate!</a>
                  </div>
                  <div className="flex justify-center space-x-2 mb-2">
                    <Link href="/contact" className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-color)] rounded-full text-xs font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors">Contact</Link>
                    <a href="#" className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-color)] rounded-full text-xs font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors">Privacy</a> {/* Privacy link remains '#' for now */}
                  </div>
                  <div>
                    Made with ❤️ by Laurensius Jeffrey Chandra
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
