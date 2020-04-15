<template>
  <v-container>
    <v-row>
      <v-col v-for="(cat, key) in cats" :key="key" :cols="4"
        ><cat-card :item="cat" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CatCard from "~/components/CatCard.vue";


export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!(store.state.user.loggedIn === true)) {
      return redirect("/");
    }
  },
  components: {
    CatCard,
  },
  data: () => ({
    show: false,
    cats: []
  }),
  mounted: function() {
    let catsDoc = this.$fireStore.collection("cats");
    catsDoc.get().then(querySnapshot => {
      let savedEntries = [];
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        catsDoc
          .doc(doc.id)
          .collection("comments")
          .get()
          .then(querySnapshot => {
            // get the total comment count
            const commentCount = querySnapshot.size;
            // console.log(doc.id, " => ", doc.data());
            savedEntries.push({ id: doc.id, commentCount, ...doc.data() });
          });
      });
      this.cats = savedEntries;
    });
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    isMobile: function() {
      // console.log("isMobile called");
      // console.log(screen.width);
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
