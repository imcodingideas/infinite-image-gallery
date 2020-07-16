const fs = require('fs');
const path = require('path');
const isProduction = require('./util.isProduction');

const devServerConfig = {
  contentBase: path.join(__dirname, 'build'),
  inline: true,
  port: 9002,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  host: '0.0.0.0',
  writeToDisk: true,
  disableHostCheck: true,
};

const attachHttpsIfDevelopment = env => {
  if (isProduction(env) === false) {
    devServerConfig.https = {
      key: fs.readFileSync(
        path.resolve(
          __dirname,
          'ssl/certificates/infinite-image-gallery.localhost/site.key.pem'
        )
      ),
      cert: fs.readFileSync(
        path.resolve(
          __dirname,
          'ssl/certificates/infinite-image-gallery.localhost/site.cert.pem'
        )
      ),
      ca: fs.readFileSync(
        path.resolve(
          __dirname,
          'ssl/certificates/infinite-image-gallery.localhost/ca-chain.cert.pem'
        )
      ),
    };
  }

  return devServerConfig;
};

module.exports = attachHttpsIfDevelopment;
