module.exports = {
    Printer: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
        consolelog = console.log
    } = dependencies
  
    function print(messages) {
        consolelog(`${messages[0].message} - ${messages[0].timestamp}`)
        return messages

    }
    
    return { 
      print
    }
  }