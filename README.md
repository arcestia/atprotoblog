# ATProtoBlog - A Modern Blog Built with AT Protocol

A modern, responsive blog that pulls posts from your PDS (Personal Data Server) using the `com.whtwnd.blog.entry` lexicon, with support for local markdown posts.

```ts
interface WhtwndBlogEntryRecord {
  $type: 'com.whtwnd.blog.entry'
  content?: string
  createdAt: string
  theme?: string
  title: string
  ogp?: {
    height: number | null
    url: string | null
    width: number | null
  }
}

interface WhtwndBlogEntryView {
  rkey: string
  cid: string
  title: string
  content?: string
  createdAt: string
  banner?: string
}
```

## Features

- **Responsive Design**: Mobile-friendly layout with topbar navigation and sidebar for desktop
- **Theme Support**: Light and dark mode with persistent user preference
- **Multiple Content Types**: Support for AT Protocol posts and local markdown files
- **Project Showcase**: Dedicated page to showcase your open-source projects
- **Cloudflare Pages Integration**: Easy deployment to Cloudflare's global network

## Configuration

Create a `.env.local` file with the following variables:

```shell
ATP_SERVICE=https://pds.skiddle.id/
ATP_IDENTIFIER=skiddle.id
ATP_DID=did:plc:kbpcqituf5ku6xorxo2wzdee
NODE_ENV=development
```

- `ATP_SERVICE`: The URL of your PDS. Find it at [internect.info](https://internect.info)
- `ATP_IDENTIFIER`: Your handle, used to determine which repo to get records from
- `ATP_DID`: Your Decentralized Identifier, also found at [internect.info](https://internect.info)
- `NODE_ENV`: Set to "development" for local development, "production" for deployment

## Development

Run the development server:

```shell
npm run dev
# or
yarn dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Deployment with Cloudflare Pages

This project is configured for deployment on Cloudflare Pages, providing global CDN distribution, automatic HTTPS, and continuous deployment from GitHub.

### Deployment Steps

1. **Push your code to GitHub**:
   ```shell
   git add .
   git commit -m "Prepare for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to "Pages" and click "Create a project"
   - Connect to your GitHub repository

3. **Configure build settings**:
   - **Project name**: `atprotoblog` (or your preferred name)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `build/client`

4. **Set environment variables**:
   - The necessary environment variables are already configured in `wrangler.toml`
   - You can also set them in the Cloudflare dashboard:
     - `ATP_SERVICE`: Your ATP service URL
     - `ATP_IDENTIFIER`: Your ATP identifier
     - `ATP_DID`: Your ATP DID
     - `NODE_ENV`: Set to "production"

5. **Deploy**:
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site

### Continuous Deployment

With GitHub integration, any future pushes to your main branch will automatically trigger a new deployment. You can also:

- Set up preview deployments for pull requests
- Configure deployment hooks for manual triggers
- Set up branch deployments for testing

## Creating Content

### AT Protocol Posts

You can create AT Protocol posts using:
- A Markdown editor and manually save them with `createRecord`
- The editor at [whtwnd's website](https://whtwnd.com/edit)

### Local Markdown Posts

Place markdown files in the appropriate directories:
- `/content/blog/` for technical blog posts
- `/content/notes/` for personal notes

## Acknowledgments

This project is based on [blug](https://github.com/haileyok/blug) by haileyok, with significant modifications including:
- Responsive design with mobile support
- Theme switching functionality
- Local markdown content support
- Cloudflare Pages deployment
- Improved project structure and organization