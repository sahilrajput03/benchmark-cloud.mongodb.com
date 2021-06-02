// If you run this file, collection will be dropped.
const {connection: db} = require('mongoose')
const {dropCollection} = require('./utils/dropCollection')

const COLLECTION_NAME = 'Cat'

const fn = async () => {
  console.log(await dropCollection(COLLECTION_NAME))
  // console.log('deleted successfully')
  db.close()
}

fn()
