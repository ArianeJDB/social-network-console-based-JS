const globalMessages = require('./globalMessages');
const { Printer } = require('./Printer')

module.exports = {
    Retriever: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
        messages = globalMessages,
        printer = Printer.create()
    } = dependencies
    
    function get(user) {
        printer.print(messages[user])
        return messages[user] 

    }
    
    return { 
      get
    }
  }