<template>
  <div>
    <ul>
      <li
        v-for="message in messages"
        :key="message.id"
      >
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "chat",

  middleware: ['chat'],

  head () {
    return {
      title: `Групповой чат ${this.user.groupName}`
    }
  },

  computed: {
    ...mapState(['user', 'messages'])
  }
}
</script>
