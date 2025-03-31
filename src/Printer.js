module.exports = {
    Printer: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
    } = dependencies
  
    function print(messages) {
      return messages

    }
    
    return { 
      print
    }
  }