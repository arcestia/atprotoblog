module.exports = {
  apps: [
    {
      name: 'atprotoblog',
      script: 'build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        ATP_SERVICE: 'https://pds.skiddle.id',
        ATP_IDENTIFIER: 'skiddle.id',
        ATP_DID: 'did:plc:kbpcqituf5ku6xorxo2wzdee',
        REDIS_URL: 'redis://localhost:6379',
        PORT: 3000
      }
    }
  ]
}