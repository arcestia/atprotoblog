export interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
  languages: string[];
}

export const projects: Project[] = [
  {
    name: 'ATProtoBlog',
    description: 'A decentralized blogging platform built with ATProto, showcasing the future of social content.',
    url: 'https://github.com/arcestia/atprotoblog',
    tags: ['TypeScript', 'ATProto', 'React', 'Remix'],
    languages: ['typescript', 'react']
  },
  {
    name: 'localizer.js',
    description: 'Native JavaScript plugin for multilingual Web applications and websites.',
    url: 'https://github.com/SinauDev/localizer.js',
    tags: ['TypeScript', 'Open-Source'],
    languages: ['typescript', 'javascript']
  },
  {
    name: 'Klasemate',
    description: 'Klasemate Open Source discussion board (Forum) Software.',
    url: 'https://github.com/arcestiaishere/klasemate',
    tags: ['PHP', 'Native', 'Self-Learning', 'Open-Source'],
    languages: ['php', 'mysql']
  },
  {
    name: 'CheckDomain',
    description: 'Check Domain Blocked on Trust+ by Kominfo.',
    url: 'https://github.com/Skiddle-ID/checkdomain',
    tags: ['API', 'DNS-Blocking', 'Blocklist', 'Censorship'],
    languages: ['javascript']
  },
];