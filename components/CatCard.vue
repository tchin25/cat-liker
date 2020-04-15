<template>
  <v-card>
    <v-img
      :src="item.img"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      contain
    >
      <v-card-title v-text="item.name"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        icon
        :color="alreadyLiked ? 'red' : ''"
        @click.prevent="onLike"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      {{ likes }}
      <v-btn icon @click="show = !show">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
      {{ commentCount }}
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Latest 5 Comments</v-subheader>
          <!-- Insert CommentCards -->
          <div v-if="comments.length == 0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>No Comments</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <comment-card
              v-for="(comment, key) in comments"
              :key="key"
              :item="comment"
            />
          </div>
          <!-- Add own comment -->
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="this.$store.state.user.data.profilePicture"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-text-field
                style="position:relative; top: 8px;"
                dense
                v-model="comment"
                label="Comment"
              >
                Comment
              </v-text-field>
              <!-- <v-list-item-subtitle v-text="this.$store.state.user.data.displayName"></v-list-item-subtitle> -->
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                icon
                :disabled="comment == '' || comment == null"
                @click.prevent="onComment"
              >
                <v-icon color="primary">mdi-message</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CommentCard from "~/components/CommentCard.vue";

export default {
  components: {
    CommentCard
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: "-1",
          img: "",
          name: "Test Name",
          likes: 0,
          commentCount: 0,
          recentComments: [
            {
              user: "Test User",
              img: "",
              comment: "Test Comment"
            }
          ]
        };
      }
    }
  },
  data: () => ({
    show: false,
    comment: "",
    comments: [],
    commentCount: 0,
    likes: 0,
    alreadyLiked: false
  }),
  mounted: function() {
    this.comments = this.item.recentComments;
    this.likes = this.item.likes;
    this.commentCount = this.item.commentCount;
    this.$fireStore
      .collection("hearts")
      .doc(this.$store.state.user.data.uid + "_" + this.item.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          //   console.log("Document data:", doc.data());
          this.alreadyLiked = true;
        } else {
          // doc.data() will be undefined in this case
          //   console.log("No such document!");
        }
      });
  },
  methods: {
    onComment: function() {
      let pushedComment = {
        name: this.$store.state.user.data.displayName,
        createdAt: this.$fireStoreObj.FieldValue.serverTimestamp(),
        comment: this.comment,
        img: this.$store.state.user.data.profilePicture
      };
      this.comments.push(pushedComment);
      this.$fireStore
        .collection("cats")
        .doc(this.item.id)
        .collection("comments")
        .add(pushedComment);
      this.comment = "";
      this.commentCount++;
    },
    onLike: function() {
      if (this.alreadyLiked) {
        return;
      }
      this.$fireStore
        .collection("hearts")
        .doc(this.$store.state.user.data.uid + "_" + this.item.id)
        .set({
          catId: this.item.id,
          userId: this.$store.state.user.data.uid
        });
      this.likes++;
      this.alreadyLiked = true;
    }
  }
};
</script>

<style></style>
