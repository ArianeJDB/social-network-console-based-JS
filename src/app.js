const readline = require("readline")
const { Storer } = require('./Storer')
const { Retriever } = require("./Retriever")
const { FollowingStorer } = require("./FollowingStorer")

module.exports = {
  App: {
    create: _create
  }
}

function _create (dependencies = {}) {
  const {
    readlineMock = readline,
    consolelog = console.log,
    storer = Storer.create(),
    retriever = Retriever.create(),
    followingStorer = FollowingStorer.create(),
    getCurrentTimestamp = Date.now
   } = dependencies

  const rl = readlineMock.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  

  function processCommand(command) {
    const timestamp = getCurrentTimestamp();
    if (command.includes("follows")) {
      const [user, userToFollow] = command.split(" follows ")
      followingStorer.store(user, userToFollow)
    }

    if (!command.includes("->") && command.split(' ').length === 1) {
      retriever.get(command)
      rl.question("> ", processCommand);
      return
    }

    if(!isUserPresentBeforeArrow(command)) {
      return 
    }

    if(!isMessagePresentAfterArrow(command)) {
      return 
    }

    const [ user, message ] = command.split(" -> ")

    storer.store({user, message, timestamp})

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