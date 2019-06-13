<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
    >
      <v-card
        class="pa-4 elevation-24"
        min-width="420"
      >
        <v-card-title
          class="display-1 pa-0 mb-3"
        >Вход в групповой чат</v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="nickname"
            :counter="12"
            :rules="nicknameRules"
            label="Никнейм"
            required
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="groupName"
            :rules="groupNameRules"
            label="Название группового чата"
            required
          ></v-text-field>

          <v-container
            class="text-lg-right pa-0"
          >
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'empty',

  head: {
    title: 'Авторизуйтесь в чате'
  },

  data: () => ({
    valid: true,

    nickname: '',

    nicknameRules: [
      v => !!v || 'Введите никнейм',
      v => (v && v.length <= 12) || 'Никнейм не должен превышать 12 символов'
    ],

    groupName: '',

    groupNameRules: [
      v => !!v || 'Введите название группового чата'
    ]
  }),

  sockets: {
    connect () {
      console.log('Client IO connected')
    }
  },

  methods: {
    ...mapMutations(['setUser']),

    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          nickname: this.nickname,
          groupName: this.groupName
        }
        this.setUser(user)
        this.$router.push('/chat')
      }
    }
  }
}
</script>
