const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const message = (name, text, owner) => ({
  name,
  text,
  owner
})

io.on('connection', socket => {
  console.log('Socket connected')

  socket.on('userSignedIn', (data, callback) => {
    if (!data.nickname || !data.groupName) {
      return callback('Введенные данные некорректны')
    } else {
      socket.join(data.groupName)
      callback({
        userId: socket.id
      })
      socket.emit('newMessage', message('admin', `Добро пожаловать в чат ${data.nickname}`))
      socket.broadcast
        .to(data.groupName)
        .emit('newMessage', message('admin', `Пользователь ${data.nickname} зашел в чат`))
    }
  })

  socket.on('createMessage', data => {
    socket.emit('newMessage', message(data.name, data.text, true))
    socket.broadcast
      .to(data.groupName)
      .emit('newMessage', message(data.name, data.text, false))
  })
})

module.exports = {
  app,
  server
}
