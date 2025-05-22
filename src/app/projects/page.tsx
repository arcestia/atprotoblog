// Removed: "use client"; 

import React from 'react';
import { Project, projects as allProjects } from '../data/projects'; // Data imported directly
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects | Skiddle's Blog",
  description: "Open-source projects I've worked on over the years.",
};

export default function ProjectsPage() {
  const projects = allProjects; // Using directly imported data

  return (
    <div className="py-8 px-6 md:px-8 w-full max-w-5xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold mb-6 text-primary">Projects</h1>
        <p className="text-lg mb-8 text-primary">
          Open-source projects I've worked on over the years. These projects showcase my interests in web development, 
          decentralized protocols, and building tools that contribute to a better internet.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project: Project) => (
            <a 
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[var(--bg-tertiary)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">{project.name}</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages.map((lang: string) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={lang}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`}
                    alt={`${lang} icon`}
                    className="w-6 h-6"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-color)] text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
