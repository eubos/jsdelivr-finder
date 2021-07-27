<template>
  <v-container>
    <v-layout>
      <v-text-field
        label="Put your package name here"
        outlined
        v-model.trim="searchString"
        v-on:keyup.enter="search"
      ></v-text-field>
      <v-btn color="primary ml-2" elevation="2" x-large @click="search"
        >Search</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SearchField',

  data: () => ({
    searchString: '',
  }),
  methods: {
    search() {
      if (!this.searchString) return;

      this.$store.dispatch('getPackage', this.searchString);
    },
  },
};
</script>
