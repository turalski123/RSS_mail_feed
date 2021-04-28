const MongoClient = require('mongodb').MongoClient


function Database () {
  if (!new.target) {
    return new Database()
  }

  let _db = null
  let _client = null

  this.connect = async (config) => {
    try {
      _client = await MongoClient.connect(config.url, config.options)
      _db = _client.db(config.name)

      if (!db) {
        console.error(`Connetcion to database was not succesful`)
        throw (e)
      }

      console.info('Connetcion to database: succesful')

    } catch (e) {
      throw e
    }
  }

  this.insert = async (name, content) => {
    const collection = _db.collection(name)
    return collection.updateOne({ email: content.email }, { $set: { rss: content.rss } }, { upsert: true })
  }

  this.find = async (name, item) => {
    const collection = _db.collection(name)
    return collection.findOne({}, { email: item })
  }

  this.update = async (name, oldContent, newContent) => {
    const collection = _db.collection(name)
    return collection.updateOne(oldContent, newContent)
  }

  this.remove = async (name, content) => {
    const collection = _db.collection(name)
    return collection.deleteOne(content)
  }

  this.drop = async (name) => {
    const collection = _db.collection(name)
    return collection.drop()
  }

  process.on('SIGTERM', () => {
    _db.close()
  })
}

module.exports = Database
