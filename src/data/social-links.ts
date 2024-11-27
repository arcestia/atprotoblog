import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faMedium, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
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
    name: 'Facebook',
    url: 'https://www.facebook.com/skiddle.id/',
    icon: faFacebook,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/skiddle.id/',
    icon: faInstagram,
  },
  {
    name: 'X',
    url: 'https://x.com/skiddleid',
    icon: faXTwitter,
  },
  {
    name: 'RSS Feed',
    url: '/feed',
    icon: faRss,
  },
];
