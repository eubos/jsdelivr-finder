<template>
  <v-container>
    <div class="progress-container">
      <v-progress-linear
        v-show="onLoad"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </div>
    <v-data-table
      v-if="searchRes.length"
      :headers="headers"
      :items="searchRes"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:body="props">
        <tr
          v-for="(index, key) in props.items"
          :key="key"
          class=""
          @click="showModal(index)"
        >
          <td class="pl-3 py-2">
            {{ index.name }}
          </td>
          <td class="pl-3 py-2">
            <v-icon>mdi-npm</v-icon>
            {{ index.version }}
          </td>
          <td class="pl-3 py-2">
            <v-avatar size="30px">
              <img :src="index.owner.avatar" :alt="index.owner.name" />
            </v-avatar>
            {{ index.owner.name }}
          </td>
          <td class="pl-3 py-2">
            <v-icon>mdi-account</v-icon>
            {{ index.humanDownloadsLast30Days }}
          </td>
          <td class="pl-4 py-2">
            <a v-if="index.homepage" :href="index.homepage">{{ index.name }}</a>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-layout v-if="isEmpty">No data to display</v-layout>
    <v-layout v-if="isError">Ooops. Some error in requesty</v-layout>
    <modal-result
      v-if="isModalVisible"
      :data="{ isModalVisible, currentPackage }"
      @close="closeModal"
    />
  </v-container>
</template>

<script>
import modalResult from './ModalResult.vue';

export default {
  components: {
    modalResult,
  },
  data() {
    return {
      headers: [
        { text: 'Package Name', value: 'name', width: '20%' },
        { text: 'Version', value: 'version', width: '20%' },
        { text: 'Author', value: 'owner', width: '20%' },
        { text: 'Downloads', value: 'humanDownloadsLast30Days', width: '20%' },
        { text: 'Homepage', value: 'homepage', width: '20%' },
      ],
      isModalVisible: false,
      currentPackage: '',
    };
  },
  computed: {
    searchRes() {
      return this.$store.getters.getSearchRes;
    },
    onLoad() {
      return this.$store.getters.getOnLoad;
    },
    isError() {
      return this.$store.getters.getIsError;
    },
    isEmpty() {
      return this.$store.getters.getIsEmpty;
    },
  },
  methods: {
    showModal(index) {
      this.isModalVisible = true;
      this.currentPackage = index;
    },
    closeModal() {
      this.currentPackage = '';
      this.isModalVisible = false;
    },
  },
};
</script>
<style scoped>
.progress-container {
  height: 5px;
}
td {
  cursor: pointer;
}
</style>
