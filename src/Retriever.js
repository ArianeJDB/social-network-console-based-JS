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
    
    function get(user, shouldPrint = true) {
      const userMessages = messages[user] || []
      if (shouldPrint && userMessages.length > 0) {
        printer.print(userMessages)
    }

      return userMessages
    }
    
    return { 
      get
    }
  }