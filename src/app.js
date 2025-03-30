const readline = require("readline")
const { Storer } = require('./Storer')

module.exports = {
  App: {
    create: _create
  }
};
function _create (dependencies = {}) {
  const {
    readlineMock = readline,
    consolelog = console.log,
    storer = Storer.create()
   } = dependencies

  const rl = readlineMock.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

  function processCommand(command) {
    if (!command.includes("->")) {
      return
    }

    if(!isUserPresentBeforeArrow(command)) {
      return 
    }

    if(!isMessagePresentAfterArrow(command)) {
      return 
    }
    
    storer.store(command)

    rl.question("> ", processCommand);
  }

  function isUserPresentBeforeArrow(command) {
    return /\w+\s->/.test(command)
  }

  function isMessagePresentAfterArrow(command) {
    return /\w+\s->\s\w+/.test(command)
  }
  
  rl.question("> ", processCommand);
  
  return { 
    processCommand
  }
}

module.exports.App.create();