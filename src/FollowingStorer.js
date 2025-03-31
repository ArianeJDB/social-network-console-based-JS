const globalFollowing = require('./globalFollowing');

module.exports = {
  FollowingStorer: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
        following = globalFollowing
    } = dependencies
  
  function store(user, followedUser) {
    following[user] = [followedUser]
  }
  
  return { 
    store
  }
}