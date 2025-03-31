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
        let text;
        if (diffInMinutes < 1) {
          text = "less than a minute ago"
        } else if (diffInMinutes === 1) {
          text = `${diffInMinutes} minute ago`
        } else {
          text = `${diffInMinutes} minutes ago`
        }
        consolelog(`${messages[0].message} (${text})`)
        return messages

    }
    
    return { 
      print
    }
  }