module.exports = {
  apps: [
    {
      name: 'atprotoblog',
      script: 'remix-serve',
      args: 'build/index.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        ATP_SERVICE: 'https://pds.skiddle.id',
        ATP_IDENTIFIER: 'skiddle.id',
        ATP_DID: 'did:plc:kbpcqituf5ku6xorxo2wzdee',
        REDIS_URL: 'redis://localhost:6379',
        PORT: 8888
      },
      listen_timeout: 50000,
      kill_timeout: 5000
    }
  ]
}
