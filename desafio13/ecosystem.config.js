module.exports = {
    /*las apps comentadas corresponden a la primera parte de la consigna"*/
    apps: [
        /*{
            name: 'app1',
            script: './src/index.js',
            watch: true,
            autorestart: true,
            args: '--puerto=8080',
        },
        {
            name: 'app2',
            script: './src/index.js',
            watch: true,
            autorestart: true,
            args: '--puerto=8081',
        },*/
        {
          name: 'app3',
          script: './src/index.js',
          watch: true,
          autorestart: true,
          args: '--puerto=8082',
        },
        {
          name: 'app4',
          script: './src/index.js',
          watch: true,
          autorestart: true,
          args: '--puerto=8083',
        },
        {
          name: 'app5',
          script: './src/index.js',
          watch: true,
          autorestart: true,
          instances: 'max',
          args: '--puerto=8084',
        },
        {
          name: 'app6',
          script: './src/index.js',
          watch: true,
          autorestart: true,
          instances: 'max',
          args: '--puerto=8085',
        },
    ],
  };