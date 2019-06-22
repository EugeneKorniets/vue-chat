const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const message = (name, text, id) => ({
  name,
  text,
  id
})

io.on('connection', socket => {
  console.log('Socket connected')

  socket.on('userSignedIn', (data, callback) => {
    if (!data.nickname || !data.groupName) {
      return callback('Введенные данные некорректны')
    }
    socket.join(data.groupName)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.nickname,
      group: data.groupName
    })
    callback({
      userId: socket.id
    })
    socket.emit('newMessage', message('admin', `Добро пожаловать в чат, ${data.nickname}`))
    socket.broadcast
      .to(data.groupName)
      .emit('newMessage', message('admin', `Пользователь ${data.nickname} зашел в чат`))
  })

  socket.on('createMessage', (data, callback) => {
    if (!data.text) {
      return callback('Текст сообщения не может быть пустым')
    }
    const user = users.get(data.id)
    if (user) {
      io
        .to(user.group)
        .emit('newMessage', message(user.name, data.text, data.id))
    }
    callback()
  })

  socket.on('userLeftChat', (data, callback) => {
    if (!data.id) {
      return callback('Введенные данные некорректны')
    }
    const user = users.get(data.id)
    users.remove(user.id)
    callback()
    socket.broadcast
      .to(user.group)
      .emit('newMessage', message('admin', `Пользователь ${user.name} вышел из чата`))
  })
})

module.exports = {
  app,
  server
}
