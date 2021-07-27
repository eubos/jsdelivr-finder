<template>
  <v-dialog v-model="show" fullscreen>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="text-lg-h5">
          {{ data.currentPackage.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <div class="d-flex flex-wrap align-center">
              <v-avatar size="50px">
                <img
                  :src="data.currentPackage.owner.avatar"
                  :alt="data.currentPackage.owner.name"
                />
              </v-avatar>
              <div class="ml-3">{{ data.currentPackage.owner.name }}</div>
              <div class="ml-3 d-flex align-center">
                <v-subheader>Latest version:</v-subheader>
                <v-chip class="ma-2" label outlined>
                  {{ data.currentPackage.version }}
                </v-chip>
              </div>
              <v-btn
                v-if="data.currentPackage.changelogFilename"
                depressed
                color="primary"
                @click="openLinkInNewTab(data.currentPackage.changelogFilename)"
                >Open changelog
              </v-btn>
              <div class="ml-3 d-flex align-center">
                <v-icon>mdi-account</v-icon>
                <div>{{ data.currentPackage.humanDownloadsLast30Days }}</div>
                <div class="ml-2 caption">last 30 days</div>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>{{
              data.currentPackage.description
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list v-if="data.currentPackage.keywords.length" three-line subheader>
        <v-subheader>Tags</v-subheader>
        <v-list-item>
          <div class="d-flex flex-wrap">
            <v-chip
              v-for="(tag, key) in data.currentPackage.keywords"
              :key="key"
              class="ma-2"
              label
              outlined
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-list-item>
      </v-list>

      <v-subheader>Links</v-subheader>
      <v-list-item>
        <v-btn
          class="mr-2"
          @click="openLinkInNewTab(data.currentPackage.repository.url)"
          ><v-icon>mdi-github</v-icon>
          <div>Github</div></v-btn
        >
        <v-btn
          class="mr-2"
          @click="
            openLinkInNewTab(
              `https://www.npmjs.com/package/${data.currentPackage.name}`
            )
          "
          ><v-icon>mdi-npm</v-icon>
          <div>npm</div></v-btn
        >
        <v-btn
          class="mr-2"
          @click="
            openLinkInNewTab(
              `https://openbase.com/js/${data.currentPackage.name}`
            )
          "
          ><v-icon>mdi-pool</v-icon>
          <div>docs&info</div></v-btn
        >
      </v-list-item>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    show: {
      get() {
        return this.data.isModalVisible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    openLinkInNewTab(linkArg) {
      let link;
      if (linkArg) {
        link = window.open(linkArg, '_blank');
      }
      link.focus();
    },
  },
};
</script>
