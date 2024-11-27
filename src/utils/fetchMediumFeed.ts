import Parser from 'rss-parser';
import { ExternalLink } from '../types/links';

const parser = new Parser();

export async function fetchMediumFeed(): Promise<ExternalLink[]> {
  const feed = await parser.parseURL('https://medium.com/@arcestia/feed');
  return feed.items.map(item => ({
    type: 'external' as const,
    title: item.title || 'No Title',
    url: item.link || '',
    source: 'Medium',
    date: item.isoDate || new Date().toISOString().split('T')[0],
  }));
}
