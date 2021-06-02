require('./mongoClient') // just to connect to mongodb.

const {connection: db} = require('mongoose')
let {log} = console

const dropCollection = (collection_name) => {
  return new Promise((res, rej) => {
    db.once('open', function () {
      // res('resolved...')
      // console.log(':INFO: db connected...')
      // console.log('connection is open now..')
      db.dropCollection(collection_name, function (err, reply) {
        if (err) {
          // log('::Error: occured when trying to delete collection collection... ')
          if (err.codeName === 'NamespaceNotFound') {
            res("🍪︎ ::SUCCESS: Collection with such name doesn't exist...")
          } else {
            log(err)
            res('Some error happened while trying to drop collection.')
          }
        }
        if (reply) {
          res('🍪︎ ::SUCCESS: Collection deleted successfully...', {reply})
        }
      })
    })
  })
}

module.exports = {dropCollection}
