const urls = {
  testDb: 'mongodb://localhost:27017/templateCollection',
  productionDb: 'mongodb://localhost:27017/prodCollection'
}

const config = {
  port: 3005,
  mongoUrl: urls.testDb,
  bodyLimit: '500kb'
}

module.exports = {
  config
}
