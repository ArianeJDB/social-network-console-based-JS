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
      const userMessages = messages[user];
      if (userMessages) {
          printer.print(userMessages);
      }
      return userMessages || [];

    }
    
    return { 
      get
    }
  }