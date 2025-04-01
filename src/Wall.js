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
    const followingUsers = followingRetriever.get(user)

    return followingUsers.flatMap(user => retriever.get(user))
  } 
  
  return { 
    process
  }
}