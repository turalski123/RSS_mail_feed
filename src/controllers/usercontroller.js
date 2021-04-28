const validate = require('jsonschema').validate
const userSchema = require('../schema/userSchema')


function UserController (storage) {
  if (!new.target) {
    return new UserController(storage)
  }

  const _storage = storage

  this.add = async (data) => {
     
      try {
      const result = validate(data, userSchema)
      storage.insert('user', { email: data.email, rss: data.rss || [] })
    }catch(e){
      console.error(JSON.stringify(e))
      throw e

    }

  }

  this.remove = async (data) => {
    try {
      return _storage.remove('user', data)
    }catch(e){
      console.error(JSON.stringify(e))
      throw e

    }
  }

  this.find = async (email) => {
      try{
      return _storage.find('user', email)
    }catch(e){
      console.error(JSON.stringify(e))
      throw e

    }
  }
}

module.exports = UserController
