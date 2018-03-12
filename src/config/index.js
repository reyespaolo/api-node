// export default {
//   "port": 3000,
//   "mongoUrl": "mongodb://localhost:27017/api-test-server",
//   "bodyLimit": "500kb"
// }


const urls = {
  testDb: 'mongodb://localhost:27017/templateCollection',
  productionDb: 'mongodb://localhost:27017/templateCollection'
}

const config = {
  port: 3005,
  mongoUrl: (global.isLocalTest == true ? urls.testDb : urls.productionDb),
  bodyLimit: '10mb'
}

module.exports = {
  config
}
