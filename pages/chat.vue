<template>
  <div>
    <ul class="message-list">
      <li
        v-for="message in messages"
        :key="message.id"
      >
        <v-chip :color="'#4F3EC8'">
          {{ message.text }}
        </v-chip>
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

<style>
  .message-list {
    padding: 10px;
    list-style: none;
  }
</style>
