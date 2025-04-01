const globalFollowing = require('./globalFollowing');
const { Printer } = require('./Printer')

module.exports = {
  FollowingRetriever: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        following = globalFollowing,
        printer = Printer.create()
    } = dependencies
  
  function get(user) {
    const usersFollowed = following[user]
    
    return usersFollowed || []
  }
  
  return { 
    get
  }
}