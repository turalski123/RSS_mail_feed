
function MailController(storage, parser, mail, sender) {
  if (!new.target) {
    return new MailController(storage, parser, mail, sender)
  }

  const _storage = storage
  const _parser = parser
  const _mail = mail
  const _sender = sender

  this.build = async (email) => {
  

   try{

    const user = await _storage.find('user', email)
    const feeds = await _parser.parse(user.rss)

    return _mail.build(feeds)}
    catch(e){
      console.error(JSON.stringify(e))
      throw e
    }
  }

  this.send = async (email, content) => {
     try{
      await _sender.send(email, content)
     }catch (e){
      console.error(JSON.stringify(e))
      throw e
     }
  }
}

module.exports = MailController
