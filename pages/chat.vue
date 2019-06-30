<template>
  <div class="chat__wrapper">
    <div class="chat__message-container">
      <chat-message
        v-for="(message, index) in messages"
        :key="index"
        :text="message.text"
        :name="message.name"
        :owner="message.id === currentUser.id"
      />
    </div>

    <div class="chat__form">
      <chat-form/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ChatMessage from '../components/chat-message'
import ChatForm from '../components/chat-form'

export default {
  name: "chat-page",

  layout: 'chat',

  components: {
    ChatMessage,
    ChatForm
  },

  middleware: ['chat'],

  head () {
    return {
      title: `Групповой чат ${this.currentUser.groupName}`
    }
  },

  computed: {
    ...mapState(['currentUser', 'messages'])
  }
}
</script>

<style lang="stylus">
  .chat
    &__wrapper
      position relative
      height 100%
      overflow hidden

    &__message-container
      position absolute
      top 0
      right 0
      bottom 80px
      left 0
      padding 14px
      overflow-y auto

    &__form
      position absolute
      right 0
      bottom 0
      left 0
      height 80px
      padding 14px
      background #1e2337
</style>
