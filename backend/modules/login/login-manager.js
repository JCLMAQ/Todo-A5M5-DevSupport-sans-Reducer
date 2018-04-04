exports.login = function(username, password) {
  const u = ds.User.find('email === :1', username);
debugger;
  if (!u || u.password !== password) {
    return false;
    return {
      // Error code returned
      error: 548,
      // Error text returned
      errorMessage: 'Authentication failed. Login or Password maybe wrong.'
    };
  }

  const roles = u.role? u.role.split(','): [];

  return {
    ID: u.getKey(),
    name: u.email,
    fullName: u.fullName,
    belongsTo: roles,
    storage: {
      ID: u.getKey(),
      group: roles,
      username: u.username,
      name: u.name
    }
  };
}
