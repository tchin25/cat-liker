<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="item.img"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="comment"></v-list-item-title>
      <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon @click.prevent="translate" color="primary lighten-1">mdi-translate</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          img: "",
          commment: "Test Comment from Comment Component",
          name: "Test User from Comment Component"
        };
      }
    }
  },
  data: () => ({
    comment: ""
  }),
  mounted: function() {
      this.comment = this.item.comment;
  },
  methods: {
    translate: function() {
      let translate = this.$fireFunc.httpsCallable("translateText");
      translate(this.item.comment).then(results => {
          console.log(results.data[0]);
          this.comment = results.data[0];
      });
    }
  }
};
</script>

<style></style>
