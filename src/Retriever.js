const { Storer, messages } = require('./Storer');

module.exports = {
    Retriever: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
        messages = {}
    } = dependencies
  
    function get(user) {
      return messages[user] 
  
    }
    
    return { 
      get
    }
  }