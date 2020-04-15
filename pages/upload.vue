<template>
  <v-container>
    <v-row>
      <v-col :cols="4"><add-cat /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddCat from "~/components/AddCat.vue";
export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!(store.state.user.loggedIn === true)) {
      return redirect("/");
    }
  },
  components: {
    AddCat
  }
};
</script>

<style></style>
