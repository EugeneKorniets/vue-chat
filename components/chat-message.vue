<template>
  <div class="chat-message">
    <div
      class="chat-message__system-message"
      v-if="name === 'admin'"
    >
      <p class="chat-message__system-message-text text-xs-center">
        {{ text }}
      </p>
      <hr>
    </div>
    <div
      class="chat-message__message"
      v-else
    >
      <div
        class="chat-message__message-body"
        :class="{ 'chat-message__message-body--owner': owner}"
      >
        <small class="chat-message__message-author">{{ name }}</small>
        <p class="chat-message__message-text">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-message',

  props: {
    name: {
      type: String
    },
    text: {
      type: String
    },
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
  .chat-message

    &__system-message
      margin-bottom 1rem

    &__system-message-text
      margin-bottom 1rem

    &__message
      display flex
      flex-direction column

    &__message-body
      position relative
      margin 0 1rem 1rem 0
      padding 1rem
      width 60%
      box-shadow 0 1px 0 0 rgba(50, 50, 50, .3)
      border-radius 20px
      background #4F3EC8

      &--owner
        align-self flex-end
        color #000
        background #10B15A

    &__message-author
      font-weight bold

    &__message-text
      margin-bottom 0


</style>
