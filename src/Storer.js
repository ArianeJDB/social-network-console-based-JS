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
    if (!messages[user]) {
      messages[user] = [];
  }
    messages[user].push({ message, timestamp })
  }
  
  return { 
    store
  }
}