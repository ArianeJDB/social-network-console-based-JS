const readline = require("readline");


module.exports = {
  App: {
    create: _create
  }
};
function _create (dependencies = {}) {
  const {
    readlineMock = readline,
    consolelog = console.log()
   } = dependencies

  const rl = readlineMock.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  
  function processCommand(command) {
    if(command === "hola") {
      consolelog(command)
    }
  
    rl.question("> ", processCommand);
  }
  
  rl.question("> ", processCommand);
  
  return { 
    processCommand
  }
}

module.exports.App.create();