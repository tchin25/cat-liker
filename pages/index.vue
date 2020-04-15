<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline text-center">
          Cat Liker
        </v-card-title>
        <v-card-text>
          Upload cat pics. Comment on cat pics. Like cat pics.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="user.data" color="error" v-on:click="signOut" x-large>
            Log Out
          </v-btn>
          <v-btn v-else color="primary" v-on:click="signIn" x-large>
            Log In
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$fireAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("User signed in");
        this.$store.dispatch("user/fetchUser", user);
      } else {
        // No user is signed in.
        this.$store.dispatch("user/fetchUser");
      }
    });
  },
  methods: {
    signIn: function() {
      console.log("sign in");
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      this.$fireAuth.signInWithPopup(provider);
    },
    signOut: function() {
      console.log("sign out");
      this.$fireAuth
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.$store.dispatch("user/fetchUser");
        })
        .catch(function(error) {
          // An error happened.
        });
    },
  }
};
</script>
