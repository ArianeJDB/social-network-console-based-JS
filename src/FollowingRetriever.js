const following = require('./globalFollowing');

module.exports = {
  FollowingRetriever: {
    create: _create
  }
}

function _create (dependencies = {}) {
    const {
    } = dependencies
  
  function get(user) {
    return user
  }
  
  return { 
    get
  }
}