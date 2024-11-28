import { promises as fs } from 'fs';
import path from 'path';

export interface LocalPost {
  type: 'local';
  title: string;
  date: string;
  description: string;
  year: string;
  slug: string;
  content?: string;
}

export async function getLocalPosts(includeContent = false): Promise<LocalPost[]> {
  const postsDir = path.join(process.cwd(), 'posts');
  const allPosts: LocalPost[] = [];
  
  try {
    const yearDirs = await fs.readdir(postsDir);
    
    for (const yearDir of yearDirs) {
      // Skip non-directory items and non-year directories
      if (!yearDir.match(/^\d{4}$/)) continue;
      
      const yearPath = path.join(postsDir, yearDir);
      const stat = await fs.stat(yearPath);
      if (!stat.isDirectory()) continue;
      
      const files = await fs.readdir(yearPath);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      const yearPosts = await Promise.all(
        markdownFiles.map(async (file) => {
          const content = await fs.readFile(path.join(yearPath, file), 'utf-8');
          const [, frontmatterStr = '', ...contentParts] = content.split('---');
          
          const frontmatter = frontmatterStr.split('\n').reduce((acc, line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
              acc[key.trim()] = valueParts.join(':').trim();
            }
            return acc;
          }, {} as Record<string, string>);
          
          // Extract the slug from the filename, removing the date prefix
          const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
          
          // Get the date from frontmatter or filename
          const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
          const date = frontmatter.date || frontmatter.updated || 
                      (dateMatch ? dateMatch[1] : new Date().toISOString());
          
          return {
            type: 'local' as const,
            title: frontmatter.title || slug.replace(/-/g, ' '),
            date,
            description: frontmatter.description || '',
            year: yearDir,
            slug,
            content: includeContent ? contentParts.join('---') : undefined,
          };
        })
      );
      
      allPosts.push(...yearPosts);
    }
    
    return allPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading local posts:', error);
    return [];
  }
}
