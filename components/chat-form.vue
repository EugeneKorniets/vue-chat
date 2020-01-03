<template>
  <v-flex xs12>
    <v-text-field
      label="Введите сообщение"
      outline
      v-model="text"
      @keydown.enter="send"
    />
  </v-flex>
</template>

<script>
  export default {
    name: 'chat-form',

    data: () => {
      return {
        text: ''
      }
    },

    methods: {
      send () {
        this.$socket.emit('createMessage', {
          id: this.$store.state.currentUser.id,
          name: this.$store.state.currentUser.nickname,
          text: this.text
        }, (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.text = ''
          }
        })
      }
    }
  }
</script>
