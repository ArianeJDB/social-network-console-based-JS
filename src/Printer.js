module.exports = {
    Printer: {
      create: _create
    }
  }
  
  function _create (dependencies = {}) {
    const {
        consolelog = console.log,
        getCurrentTimestamp = Date.now
    } = dependencies
  
    function print(messages) {
      const currentTime = getCurrentTimestamp();
      const messageTime = messages[0].timestamp;
      const diffInMs = currentTime - messageTime;
      const diffInMinutes = Math.floor(diffInMs / (60 * 1000));

        consolelog(`${messages[0].message} (${diffInMinutes} minutes ago)`)
        return messages

    }
    
    return { 
      print
    }
  }