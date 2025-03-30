module.exports = {
  Storer: {
    create: _create
  }
};

function _create (dependencies = {}) {

  
  function store(command) {
    return command
  }
  
  return { 
    store
  }
}

module.exports.Storer.create();