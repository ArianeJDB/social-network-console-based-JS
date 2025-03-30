module.exports = {
  Storer: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        messages = {}
    } = dependencies
  
  function store({user, message, timestamp}) {
    messages[user] = [{message, timestamp}]

  }
  
  return { 
    store
  }
}