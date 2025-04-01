const {Retriever} = require('./Retriever');
const globalMessages = require('./globalMessages');

module.exports = {
  Wall: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        retriever = Retriever.create()
    } = dependencies
  
  function process(user) {
    return retriever.get(user)
  } 
  
  return { 
    process
  }
}