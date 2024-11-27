export interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: 'ATProtoBlog',
    description: 'A decentralized blogging platform built with ATProto, showcasing the future of social content.',
    url: 'https://github.com/arcestia/atprotoblog',
    tags: ['TypeScript', 'ATProto', 'React', 'Remix'],
  },
  {
    name: 'PowerYourself',
    description: 'A personal development and learning efficiency platform to help people maximize their potential.',
    url: 'https://medium.com/catatan-arcestia/mengenali-diri-untuk-memaksimalkan-efisiensi-belajar-poweryourself-67abe80f8cbc',
    tags: ['Personal Development', 'Learning', 'Self-Improvement'],
  },
];
