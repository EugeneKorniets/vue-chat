<template>
  <v-app app dark>
    <v-content>
      <v-container fluid>
        <h1 class="text-xs-center">Страница не найдена</h1>
        <div class="pa-3 d-block text-xs-center">
          <router-link
            to="/"
            class=""
            color="primary"
          >
            На главную
          </router-link>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'error-layout'
}
</script>
