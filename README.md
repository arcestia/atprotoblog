# Atprotoblog - An ATProtocol Blog

A simple little blog that pulls posts from your PDS, using the `com.whtwnd.blog.entry` lexicon.

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

## Configuration

Just a few things are needed in your `.env` file.

```shell
ATP_SERVICE=https://pds.skiddle.id/
ATP_IDENTIFIER=skiddle.id
ATP_DID=did:plc:kbpcqituf5ku6xorxo2wzdee
```

- `ATP_SERVICE` is the URL of your PDS. It's probably hosted by Bluesky. Find it at [internect.info](https://internect.info).
- `ATP_IDENTIFIER` is your handle. It's used to know which repo to get records from.
- `ATP_DID` is...your DID. Again, find it at [internect.info](https://internect.info). Used to get your Bluesky profile (I use this just to get the already-hosted copy of your profile picture. You could rewrite this if you wanted to, would be faster too).

## Development

Just run the Vite server, you know, like usual?

```shell
yarn run dev
```

## Deployment

Make sure you have `dotenv-cli` installed.

```shell
npm install -g dotenv-cli
```

Then build and serve.

```shell
yarn build
yarn start
```

## Creating Posts

There's various ways you could do this. I just use a Markdown editor and then manually save them with `createRecord`. You can also use the editor at [whtwnd's website](https://whtwnd.com/edit) to create them.

## Deployment Using Docker

You can deploy `atprotoblog` using Docker for a more streamlined and isolated environment. Here’s how:

1. **Build the Docker Image**:

   ```shell
   docker build -t atprotoblog .
   ```

2. **Run the Container**:

   To run the container and expose it on a specific port (e.g., port 3000):

   ```shell
   docker run -d -p 3000:3000 --name atprotoblog ghcr.io/arcestia/atprotoblog:latest
   ```

3. **Using Docker Compose**:

   Alternatively, you can use Docker Compose for a more declarative setup. Create a `docker-compose.yml`:

   ```yaml
   version: '3.8'

   services:
     atprotoblog:
       image: ghcr.io/arcestia/atprotoblog:latest
       container_name: atprotoblog
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
       restart: unless-stopped
   ```

   Then run:

   ```shell
   docker-compose up -d
   ```

This approach will help in quickly deploying the application, allowing you to manage it effectively with Docker's features like container restarts and isolated environments.

## PM2 Deployment

As an alternative to Docker deployment, you can use PM2 to run the application:

### Prerequisites
- Node.js 18 or later
- Yarn package manager
- PM2 (installed globally or as a project dependency)

### Deployment Steps

1. Install dependencies:
```bash
yarn install
```

2. Build the application:
```bash
yarn build
```

3. Start the application with PM2:
```bash
yarn start:pm2
```

### PM2 Management Commands

- Stop the application: `yarn stop:pm2`
- Reload the application: `yarn reload:pm2`
- View logs: `pm2 logs atprotoblog`
- Monitor: `pm2 monit`
- List running apps: `pm2 list`

### Environment Variables

Make sure to set up your environment variables before deploying. You can modify them in the `ecosystem.config.js` file:

- `NODE_ENV`: Production environment
- `ATP_SERVICE`: Your ATP service URL
- `ATP_IDENTIFIER`: Your ATP identifier
- `ATP_DID`: Your ATP DID
- `REDIS_URL`: Redis connection URL
- `PORT`: Application port (default: 3000)

## Related Project

This project is based on [blug](https://github.com/haileyok/blug) by haileyok. I have made some modifications and Dockerized it to make deployment easier.