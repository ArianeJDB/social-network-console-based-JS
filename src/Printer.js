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
  
    function print(messages, user) {
        const currentTime = getCurrentTimestamp()
        messages.forEach(({message, timestamp}) => {
          const diffInMinutes = Math.floor((currentTime - timestamp) / (60 * 1000));
          const timeText =
          diffInMinutes < 1 
          ? "less than a minute ago" 
          : diffInMinutes === 1
          ? "1 minute ago"
          : `${diffInMinutes} minutes ago`;
          
          const prefix = user ? `${user} - ` : "";
          consolelog(`${prefix}${message} (${timeText})`);
        })

        return messages

    }
    
    return { 
      print
    }
  }