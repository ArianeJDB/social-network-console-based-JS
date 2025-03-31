const globalMessages = require('./globalMessages');

module.exports = {
  Storer: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        messages = globalMessages
    } = dependencies
  
  function store({user, message, timestamp}) {
    return messages[user] = [{message, timestamp}]
  }
  
  return { 
    store
  }
}