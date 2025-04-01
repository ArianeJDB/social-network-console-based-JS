const { Retriever } = require('./Retriever');
const { FollowingRetriever } = require('./FollowingRetriever')
const globalMessages = require('./globalMessages');
const {Printer } = require('./Printer');

module.exports = {
  Wall: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        retriever = Retriever.create(),
        followingRetriever = FollowingRetriever.create(),
        printer = Printer.create()
    } = dependencies
  
  function process(user) {
    const ownMessages = retriever.get(user, false)
    const followingUsers = followingRetriever.get(user)
    const followingMessages = followingUsers.flatMap(user => retriever.get(user, false))
    const allMessages = [...ownMessages, ...followingMessages]
    const messagesSorted = allMessages.sort((a, b) => b.timestamp - a.timestamp)

    printer.print(messagesSorted)

    return messagesSorted
  } 
  
  return { 
    process
  }
}