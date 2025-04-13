import React, { useEffect, useRef } from 'react';

interface CommentsProps {
  title: string;
}

export function Comments({ title }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any existing script first to avoid duplicates
    const existingScript = document.getElementById('utterances-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create the script element
    const script = document.createElement('script');
    script.id = 'utterances-script';
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'arcestia/comments');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('label', 'skiddle-id');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // Add the script to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title]); // Re-run when title changes

  return (
    <div className="mt-10 pt-10 border-t border-300">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div ref={containerRef} className="utterances-comments"></div>
    </div>
  );
}
