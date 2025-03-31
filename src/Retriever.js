const globalMessages = require('./globalMessages');

module.exports = {
    Retriever: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
        messages = globalMessages
    } = dependencies
    
    function get(user) {
      return messages[user] 

    }
    
    return { 
      get
    }
  }