<template>
  <v-flex xs12>
    <v-text-field
      label="Введите сообщение"
      outline
      v-model="text"
      @keydown.enter="send"
    ></v-text-field>
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
          text: this.text,
          id: this.$store.state.user.id,
          name: this.$store.state.user.nickname,
          groupName: this.$store.state.user.groupName
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
