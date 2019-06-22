class Users {
  constructor() {
    this.users = []
  }

  add (user) {
    this.users.push(user)
  }

  get (id) {
    return this.users.find(user => user.id === id)
  }

  remove (id) {
    const user = this.get(id)
    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }
    return user
  }

  getByGroup (group) {
    return this.users.filter(user => user.group === group)
  }
}

module.exports = function usersClass () {
  return new Users
}
