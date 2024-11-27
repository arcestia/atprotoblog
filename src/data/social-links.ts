import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SocialLink {
  name: string;
  url: string;
  icon: IconDefinition;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/skiddle.id',
    icon: faBluesky,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/arcestia',
    icon: faGithub,
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@arcestia',
    icon: faMedium,
  },
  {
    name: 'RSS Feed',
    url: '/feed',
    icon: faRss,
  },
];
