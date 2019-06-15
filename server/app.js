const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

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
    } else {
      socket.join(data.groupName)
      callback({
        userId: socket.id
      })
      socket.emit('newMessage', message('admin', `Добро пожаловать в чат ${data.nickname}`, -1))
      socket.broadcast
        .to(data.groupName)
        .emit('newMessage', message('admin', `Пользователь ${data.nickname} зашел в чат.`, -2))
    }
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' server'
      })
    }, 500)
  })
})

module.exports = {
  app,
  server
}
