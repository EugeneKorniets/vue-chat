<template>
  <v-app app dark>
    <v-navigation-drawer
      app
      v-model="isDrawerVisible"
      mobile-break-point="650"
    >
      <v-list subheader>
        <v-subheader class="subheading">Список пользователей онлайн</v-subheader>
        <v-list-tile
          v-for="user in users"
          :key="user.id"
          avatar
          @click=""
        >
          <v-list-tile-avatar>
            <img
              v-if="user.avatarLink"
              :src="user.avatarLink"
              alt=""
            >
            <v-icon
              v-else
              dark
            >account_circle</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="user.nickname"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon
              v-if="user.id === 2"
              :color="'#10B15A'">check_circle</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="isDrawerVisible = !isDrawerVisible"/>
      <v-toolbar-title>Групповой чат {{ user.groupName }}</v-toolbar-title>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="exit"
      >
        Выйти из чата
      </v-btn>
    </v-toolbar>
    <v-content>
      <div class="chat__container">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    isDrawerVisible: true,

    users: [
      {
        id: 1,
        nickname: 'Программер',
        avatarLink: ''
      },
      {
        id: 2,
        nickname: 'Программер 1',
        avatarLink: ''
      },
      {
        id: 3,
        nickname: 'Программер 2',
        avatarLink: ''
      }
    ]
  }),

  computed: {
    ...mapState(['user'])
  },

  methods: {
    ...mapMutations(['clearData']),

    exit () {
      this.$router.push('/?message=leftChat')
      this.clearData()
    }
  }
}
</script>

<style lang="stylus">
  .chat__container
    height 100%
</style>
