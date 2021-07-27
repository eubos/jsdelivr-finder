<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center header-title">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/JsDelivr_Logo.svg"
          transition="scale-transition"
          width="140"
        />
        <h2>Finder</h2>
      </div>
    </v-app-bar>

    <v-main>
      <SearchField />
      <SearchResults />
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="">
          <strong class="subheading">Aleksei Selemenev</strong>

          <v-spacer></v-spacer>
          <div>{{ new Date().getFullYear() }} — <strong>Vuetify</strong></div>
          <v-spacer></v-spacer>

          <v-btn
            class="mx-4"
            dark
            icon
            href="https://github.com/eubos"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import SearchField from './components/SearchField.vue';
import SearchResults from './components/SearchResults.vue';

export default {
  name: 'App',

  components: {
    SearchField,
    SearchResults,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.header-title {
  color: #1d3a45;
}
</style>
