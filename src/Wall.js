const {Retriever} = require('./Retriever');
const { FollowingRetriever } = require('./FollowingRetriever')
const globalMessages = require('./globalMessages');

module.exports = {
  Wall: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        retriever = Retriever.create(),
        followingRetriever = FollowingRetriever.create()
    } = dependencies
  
  function process(user) {
    const ownMessages = retriever.get(user)
    const followingUsers = followingRetriever.get(user)
    const followingMessages = followingUsers.flatMap(user => retriever.get(user))
    const allMessages = [...ownMessages, ...followingMessages]

    return allMessages.sort((a, b) => b.timestamp - a.timestamp);
  } 
  
  return { 
    process
  }
}